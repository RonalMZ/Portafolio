"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatMXN } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function ProductCard({
  product,
  highlight,
  index = 0,
}: {
  product: Product;
  highlight?: string;
  index?: number;
}) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
    >
      <Link href={`/product/${product.id}`} aria-label={product.name}>
        <Card className="group relative h-full overflow-hidden border-border/60 transition-all hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-xl hover:shadow-violet-500/5">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute left-2 top-2 flex flex-col gap-1">
              {discount > 0 && (
                <Badge className="bg-rose-500 text-white shadow">
                  -{discount}%
                </Badge>
              )}
              {highlight && (
                <Badge className="bg-violet-500 text-white shadow">
                  {highlight}
                </Badge>
              )}
            </div>
            {product.freeShipping && (
              <Badge
                variant="success"
                className="absolute bottom-2 left-2 flex items-center gap-1"
              >
                <Truck className="h-3 w-3" /> Envío gratis
              </Badge>
            )}
          </div>

          <CardContent className="p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </div>
            <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug">
              {product.name}
            </h3>

            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-medium text-foreground">
                {product.rating.toFixed(1)}
              </span>
              <span>· {product.reviews} reseñas</span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-lg font-bold tracking-tight">
                {formatMXN(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatMXN(product.oldPrice)}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
