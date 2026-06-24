import { useMemo, useState, useCallback } from 'react';
import recipes from './data/recipes.js';
import { getTranslation } from './i18n/translations.js';

function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [language, setLanguage] = useState('fr');
  const [portions, setPortions] = useState(4);

  const t = useCallback((key) => getTranslation(language, key), [language]);

  const r = useCallback((recipe, field) => {
    // Return bilingual field, e.g. name → nameEn when language='en'
    const langSuffix = language === 'en' ? 'En' : '';
    const val = recipe[field + langSuffix];
    return val || recipe[field] || '';
  }, [language]);

  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return recipes.filter((recipe) => {
      const searchName = (recipe.name + ' ' + (recipe.nameEn || '')).toLowerCase();
      const searchRegion = (recipe.region + ' ' + (recipe.regionEn || '')).toLowerCase();
      return searchName.includes(lower) ||
        searchRegion.includes(lower) ||
        recipe.ingredients.some((ing) =>
          (ing.name + ' ' + (ing.nameEn || '')).toLowerCase().includes(lower)
        );
    });
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

  const displayName = useCallback((recipe) => r(recipe, 'name'), [r]);
  const displayRegion = useCallback((recipe) => r(recipe, 'region'), [r]);
  const displayOrigin = useCallback((recipe) => r(recipe, 'origin'), [r]);
  const displayDescription = useCallback((recipe) => r(recipe, 'description'), [r]);
  const displayIngredientName = useCallback((ing) => {
    if (language === 'en' && ing.nameEn) return ing.nameEn;
    return ing.name;
  }, [language]);

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
        <div className="search-info">
          {filtered.length} {t('list.title')} ({recipes.length} {t('list.total')})
        </div>
      </section>

      <main className="content-grid">
        <div className="recipe-list">
          <h2>{t('list.title')}</h2>
          {filtered.length === 0 ? (
            <p>{t('list.empty')}</p>
          ) : (
            <ul>
              {filtered.map((recipe) => (
                <li key={recipe.id} onClick={() => { setSelected(recipe); setPortions(recipe.portions); }} className={selected?.id === recipe.id ? 'active' : ''}>
                  <img src={recipe.photoUrl} alt={displayName(recipe)} />
                  <div>
                    <strong>{displayName(recipe)}</strong>
                    <span className="region-badge">{displayRegion(recipe)}</span>
                    <span className="category-badge">{r(recipe, 'category')}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="recipe-detail">
          {adjustedRecipe ? (
            <article>
              <div className="detail-header">
                <img src={adjustedRecipe.photoUrl} alt={displayName(adjustedRecipe)} className="detail-image" />
                <div>
                  <h2>{displayName(adjustedRecipe)}</h2>
                  <span className="region-badge">{displayRegion(adjustedRecipe)}</span>
                  <span className="category-badge">{r(adjustedRecipe, 'category')}</span>
                </div>
              </div>
              <p className="origin">{t('detail.origin')}: {displayOrigin(adjustedRecipe)}</p>
              <p className="description">{displayDescription(adjustedRecipe)}</p>
              <div className="metadata">
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
              <ul className="ingredient-list">
                {adjustedRecipe.ingredients.map((item, index) => (
                  <li key={index}>
                    <span className="qty">{item.quantity}</span>
                    <span className="sep">—</span>
                    <span className="name">{displayIngredientName(item)}</span>
                  </li>
                ))}
              </ul>
              <h3>{t('detail.steps')}</h3>
              <ol className="steps-list">
                {(language === 'en' && adjustedRecipe.stepsEn ? adjustedRecipe.stepsEn : adjustedRecipe.steps).map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <p className="video-link">
                <a href={adjustedRecipe.videoUrl} target="_blank" rel="noreferrer">▶ {t('detail.video')}</a>
              </p>
            </article>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🍲</div>
              <p>{t('detail.empty')}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
