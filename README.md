# Opportunity Radar

Herramienta local para investigar, comparar y priorizar oportunidades de dropshipping en Estados Unidos con economía, evidencias, riesgo y confianza separados.

## Lo que hace

- CRUD de productos y proveedores.
- Scoring determinista y versionado.
- Nivel de confianza basado en integridad y evidencias.
- Cálculos de margen, CAC de equilibrio y escenarios.
- Comparación de proveedores.
- Registro de fuentes con fecha y verificación manual.
- Conceptos y guiones editables para Higgsfield.
- Importación CSV y exportación CSV/JSON.
- Configuración de pesos del modelo.
- Descubrimiento de señales públicas en Estados Unidos mediante Google Trends y Google News RSS.
- Bandeja de revisión con relevancia comercial, confianza, procedencia y promoción a producto.
- Abastecimiento mediante la API oficial de CJdropshipping: búsqueda, variantes, stock y flete a Estados Unidos.
- Catálogo global de candidatos CJ con fichas locales seguras.
- Análisis automático local que separa hechos, estimaciones y datos faltantes.
- Ranking histórico por lotes con puntuación, confianza, bloqueos y decisiones explicables.
- Inteligencia competitiva y snapshots históricos de costo, stock, variantes y entrega.
- Generador y editor de storefronts por producto, con publicación local.
- Checkout de reserva para Estados Unidos, gestión de pedidos, tracking y embudo de métricas.

La aplicación descubre señales públicas y candidatos de proveedores, pero no confirma viralidad ni garantiza ventas. Una puntuación alta es una prioridad de validación, no un "producto ganador" confirmado.

La sección **Descubrir** consulta señales públicas cuando pulsas “Actualizar señales”. Google Trends aporta términos, fecha y tráfico aproximado; Google News aporta contexto, no volumen de búsqueda. La caché evita consultar una fuente más de una vez cada 15 minutos. Las fuentes pueden cambiar o dejar de estar disponibles.

Desde el detalle de una señal, **Buscar productos en CJ** genera consultas editables, obtiene candidatos reales y calcula costo entregado cuando CJ ofrece una opción de flete. Configura `OPPORTUNITY_CJ_API_KEY` en `.env`. La clave y los tokens no se almacenan en SQLite ni se incluyen en exportaciones.

## Instalación en Windows

Se necesita Python 3.11 o superior.

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python -m uvicorn app.main:app --reload
```

Abre [http://127.0.0.1:8000](http://127.0.0.1:8000).

También puedes ejecutar `start.ps1`, que crea el entorno e instala dependencias cuando sea necesario.

## Flujo operativo local

1. Actualiza señales en `/discover` y revisa la procedencia.
2. Busca candidatos CJ desde una señal y verifica variantes, costo entregado, stock y plazo.
3. Promueve candidatos, completa evidencias competitivas y ejecuta el ranking.
4. Genera la tienda desde el producto, revisa textos, políticas y precio, y publícala.
5. El cliente crea una reserva desde `/shop/{slug}/checkout`; se administra en `/orders`.
6. `/metrics` contabiliza vistas, checkouts, pedidos e ingresos marcados realmente como cobrados.

El checkout local no recibe datos de tarjeta ni realiza cargos. Los pedidos nacen como `awaiting_provider`. Para cobrar en producción hay que integrar un proveedor como Stripe o PayPal mediante checkout alojado y webhooks verificados. Hasta entonces, la interfaz lo comunica como reserva y no como compra pagada.

## Pruebas

```powershell
python -m pytest -q
```

## CSV

`examples/products.csv` contiene las columnas admitidas para productos. Las obligatorias son `name`, `category` y `proposed_price`.

`examples/suppliers.csv` contiene proveedores. Requiere que el `product_id` ya exista. Sus columnas obligatorias son `product_id`, `name`, `product_cost` y `shipping_cost`.

Todos los datos incluidos en los ejemplos están marcados como ficticios y no representan productos ni proveedores reales.

## Datos y privacidad

La base predeterminada es `opportunity_radar.db` en el directorio del proyecto. Las consultas externas se limitan a las fuentes públicas documentadas y a CJ cuando el usuario las ejecuta. El análisis automático predeterminado es local y determinista.

`.env`, bases SQLite, cachés, resultados generados y paquetes quedan excluidos del repositorio mediante `.gitignore`.

## Método

El score pondera economía, demanda, diferenciación, potencial visual, proveedor, logística y riesgo. La confianza se calcula aparte y disminuye cuando faltan datos o fuentes. Los pesos pueden editarse en `/settings`; cada evaluación guarda su versión y resultado histórico.

## Límites importantes

- No sustituye muestras físicas, asesoría legal ni validación de mercado.
- No verifica automáticamente que una URL o métrica sea cierta.
- No realiza scraping ni evade controles de plataformas.
- No debe usarse para prometer resultados o atribuir funciones no documentadas.
- Una tendencia puede deberse a noticias o entretenimiento; siempre revisa la procedencia antes de promoverla.

## Centro de investigación completo

Abre `/research`. Allí puedes configurar fuentes gratuitas; importar CSV de TikTok, Meta Ads, Amazon, Pinterest, proveedores y campañas; consultar expedientes deduplicados; revisar riesgos y alertas; y registrar experimentos reales.

El sistema conserva los campos ausentes como desconocidos. No inventa volumen, ventas, stock, costos ni reseñas. Una decisión `validate` significa candidato para una prueba pequeña, no producto ganador confirmado. Solo permite `scale` cuando existen al menos 3 compras, ROAS de 1.5 o superior, ganancia neta positiva y reembolsos de 10% o menos.

Ejecuta el ciclo completo manualmente con:

```powershell
python -m app.research_cycle
```

Instala la ejecución diaria de Windows a las 08:00 con:

```powershell
.\install-research-task.ps1
```

El resumen local se guarda en `outputs/research-cycle-latest.json` y no se sube al repositorio.

## Shopify theme

The native Shopify theme lives in [`shopify-theme/`](shopify-theme/). It is separate from the local research tool and contains the Auralis home page, product page, and cart. See [`docs/storefront/auralis-shopify-theme.md`](docs/storefront/auralis-shopify-theme.md) for Shopify connection steps.
