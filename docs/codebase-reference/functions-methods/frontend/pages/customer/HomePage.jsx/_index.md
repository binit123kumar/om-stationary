# Declaration index: pages/customer/HomePage.jsx

**Source:** `frontend/src/pages/customer/HomePage.jsx`  
**Named declarations identified:** 3  
**Linked module report:** [HomePage.md](../../../../../pages/customer/HomePage.md)

## Individually reported named declarations

- [`HomePage` (line 7)](HomePage.md)
- [`cardProps` (line 15)](cardProps.md)
- [`rememberRecentProduct` (line 80)](rememberRecentProduct.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 9; lexical line fragment `const availableCategories = [...new Set([...categories, ...products.map((product) => product.cat).filter(Boolean)])];` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 11; lexical line fragment `const recentProducts = recentIds.map((id) => products.find((product) => product.id === id)).filter(Boolean);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 11; lexical line fragment `const recentProducts = recentIds.map((id) => products.find((product) => product.id === id)).filter(Boolean);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 12; lexical line fragment `const offers = products.filter((product) => Number(product.mrp) > Number(product.price)).slice(0, 4);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 13; lexical line fragment `const recentAdditions = products.filter((product) => product.createdAt)` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 14; lexical line fragment `.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 49; lexical line fragment `{availableCategories.length ? <div className="cats">{availableCategories.map((category, index) => <Link to={'/search?cat=${encodeURIComponent(category)}'} key={category}>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 54; lexical line fragment `{loading ? <div className="catalog-state" role="status">Loading the catalogueâ€¦</div> : error ? <div className="catalog-state error" role="alert">{error}<button className=` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 54; lexical line fragment `{loading ? <div className="catalog-state" role="status">Loading the catalogueâ€¦</div> : error ? <div className="catalog-state error" role="alert">{error}<button className=` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 64; lexical line fragment `<div className="grid">{offers.map((product) => <ProductCard {...cardProps(product)} />)}</div>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 69; lexical line fragment `<div className="grid">{recentAdditions.map((product) => <ProductCard {...cardProps(product)} />)}</div>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 12: source line 74; lexical line fragment `<div className="grid">{recentProducts.map((product) => <ProductCard {...cardProps(product)} />)}</div>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 13: source line 81; lexical line fragment `const recent = [productId, ...readRecentProducts().filter((id) => id !== productId)].slice(0, 6);` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
