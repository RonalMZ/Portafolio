import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { products } from "@/lib/products";
import { formatMXN } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { AIDescription } from "./ai-description";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <>
      <div className="container py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al catálogo
        </Link>
      </div>

      <div className="container grid gap-10 pb-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border/60 bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {discount > 0 && (
            <Badge className="absolute left-4 top-4 bg-rose-500 text-white shadow">
              -{discount}%
            </Badge>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.brand} · {product.category}
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                · {product.reviews} reseñas
              </span>
            </span>
            {product.freeShipping && (
              <Badge variant="success" className="gap-1">
                <Truck className="h-3 w-3" /> Envío gratis
              </Badge>
            )}
            {product.tags.slice(0, 2).map((t) => (
              <Badge key={t} variant="outline">
                #{t}
              </Badge>
            ))}
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-4xl font-bold tracking-tight">
              {formatMXN(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatMXN(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 text-pretty text-base text-muted-foreground">
            {product.shortDescription}
          </p>

          <AIDescription productId={product.id} />

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Detalles
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {product.longDescription}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.tags.map((t) => (
                <Badge key={t} variant="outline" className="text-xs">
                  #{t}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="flex-1 sm:flex-none">
              Agregar al carrito (demo)
            </Button>
            <Button size="lg" variant="outline">
              Comprar ahora
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2 text-xs text-muted-foreground sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card p-3">
              <Truck className="h-4 w-4 text-emerald-500" /> Envío en 2-5 días
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card p-3">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Compra
              protegida
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card p-3">
              <RotateCcw className="h-4 w-4 text-emerald-500" /> 30 días para
              devolver
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container pb-16">
          <h2 className="mb-4 text-xl font-bold tracking-tight">
            También te puede gustar
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
