# Auralis Shopify theme

This directory contains an Online Store 2.0 Shopify theme, separate from the local research application.

## What it is

- Brand name: **Auralis**. It is a temporary but production-ready store name, chosen to work beyond one product category.
- Visual direction: warm porcelain, graphite, and restrained copper. It avoids generic blue technology styling, heavy glass panels, fake metrics, and unverified product claims.
- Product motion: a light CSS 3D tilt on fine-pointer devices and a slow orbit graphic. Both respect `prefers-reduced-motion` and do not run on touch input.
- Product content: the hero and feature copy are intentionally cautious. Replace it only with supplier-verified claims before publishing.

## Connect it to Shopify

1. In Shopify admin, go to **Online Store > Themes** and add a development theme or use the Shopify GitHub integration.
2. Point the integration at this repository and select the `shopify-theme` directory if Shopify asks for a theme path. If it only supports a repository root, use Shopify CLI from this directory:

   ```powershell
   cd shopify-theme
   shopify theme push --store c8us0k-nm.myshopify.com
   ```

3. In **Customize**, open the Auralis home section and select the product after it has been imported from CJ.
4. In **Theme settings**, set the brand name and main menu.
5. Review every product claim, shipping time, price, legal policy, and checkout configuration before publishing.

The theme does not contain supplier credentials, CJ credentials, payment data, or automated fulfillment logic.
