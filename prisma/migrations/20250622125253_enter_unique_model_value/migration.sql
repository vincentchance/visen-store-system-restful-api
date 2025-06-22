/*
  Warnings:

  - A unique constraint covering the columns `[product_name]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_category]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `products_product_name_key` ON `products`(`product_name`);

-- CreateIndex
CREATE UNIQUE INDEX `products_product_category_key` ON `products`(`product_category`);
