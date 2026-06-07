import { useMemo, useState, useCallback } from 'react';
import recipes from './data/recipes.js';
import { getTranslation } from './i18n/translations.js';

function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [language, setLanguage] = useState('fr');
  const [portions, setPortions] = useState(4);

  const t = useCallback((key) => getTranslation(language, key), [language]);

  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) => ingredient.name.toLowerCase().includes(lower)) ||
      recipe.name.toLowerCase().includes(lower) ||
      recipe.region.toLowerCase().includes(lower)
    );
  }, [query]);

  const adjustedRecipe = useMemo(() => {
    if (!selected) return null;
    const ratio = portions / selected.portions;
    return {
      ...selected,
      ingredients: selected.ingredients.map((ing) => ({
        ...ing,
        quantity: `${parseFloat(ing.quantity) * ratio || ing.quantity}`,
      })),
    };
  }, [selected, portions]);

  return (
    <div className="app-shell">
      <header>
        <div className="header-top">
          <h1>TasteCam Heritage</h1>
          <div className="header-controls">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="lang-select">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        <p>{t('header.subtitle')}</p>
      </header>

      <section className="search-panel">
        <input
          type="search"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>

      <main className="content-grid">
        <div className="recipe-list">
          <h2>{t('list.title')}</h2>
          {filtered.length === 0 ? (
            <p>{t('list.empty')}</p>
          ) : (
            <ul>
              {filtered.map((recipe) => (
                <li key={recipe.id} onClick={() => { setSelected(recipe); setPortions(recipe.portions); }}>
                  <img src={recipe.photoUrl} alt={recipe.name} />
                  <div>
                    <strong>{recipe.name}</strong>
                    <span>{recipe.region}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="recipe-detail">
          {adjustedRecipe ? (
            <article>
              <h2>{adjustedRecipe.name}</h2>
              <p className="origin">{t('detail.origin')}: {adjustedRecipe.origin}</p>
              <p>{adjustedRecipe.description}</p>
              <div className="metadata">
                <span>{t('detail.region')}: {adjustedRecipe.region}</span>
                <div>
                  <label>{t('detail.portions')}:</label>
                  <input
                    type="number"
                    min="1"
                    value={portions}
                    onChange={(e) => setPortions(parseInt(e.target.value, 10))}
                  />
                </div>
              </div>
              <h3>{t('detail.ingredients')}</h3>
              <ul>
                {adjustedRecipe.ingredients.map((item, index) => (
                  <li key={index}>{item.quantity} - {item.name}</li>
                ))}
              </ul>
              <h3>{t('detail.steps')}</h3>
              <ol>
                {adjustedRecipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <p>
                <a href={adjustedRecipe.videoUrl} target="_blank" rel="noreferrer">{t('detail.video')}</a>
              </p>
            </article>
          ) : (
            <div className="empty-state">
              <p>{t('detail.empty')}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
