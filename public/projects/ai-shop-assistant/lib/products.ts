/**
 * Catálogo en memoria — funciona como knowledge base para la IA (RAG simple).
 * Inspirado en e-commerce de LATAM (productos típicos de Mercado Libre / Amazon MX).
 */

export type Category =
  | "Calzado"
  | "Ropa"
  | "Electrónicos"
  | "Hogar"
  | "Accesorios"
  | "Belleza"
  | "Deportes";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  inStock: boolean;
  freeShipping: boolean;
};

export const products: Product[] = [
  {
    id: "tenis-runner-pro",
    name: "Tenis RunnerPro Lite — para correr en arena y asfalto",
    brand: "AeroSport",
    category: "Calzado",
    price: 1299,
    oldPrice: 1799,
    rating: 4.7,
    reviews: 832,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
    shortDescription:
      "Tenis ligeros con suela antiderrapante, ideales para correr en playa o calle.",
    longDescription:
      "Diseñados para climas cálidos como el de Sinaloa: malla transpirable, drenaje rápido y suela con tracción extra para arena húmeda. Plantilla con memoria que reduce el impacto en distancias largas.",
    tags: ["correr", "playa", "verano", "running", "deportivo"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: "tenis-urbano-clasico",
    name: "Tenis Urbano Clásico Blanco",
    brand: "Nimbus",
    category: "Calzado",
    price: 899,
    rating: 4.4,
    reviews: 412,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&q=80",
    shortDescription: "Sneakers minimalistas que combinan con todo.",
    longDescription:
      "Piel sintética premium, suela de goma y diseño limpio. Perfectos para uso diario, oficina creativa o salidas casuales.",
    tags: ["casual", "blanco", "diario", "oficina"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: "audifonos-bt-noise",
    name: "Audífonos Bluetooth NoiseGuard X3",
    brand: "Sonix",
    category: "Electrónicos",
    price: 1599,
    oldPrice: 2299,
    rating: 4.6,
    reviews: 1284,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80",
    shortDescription:
      "Cancelación activa de ruido y 30 horas de batería.",
    longDescription:
      "Drivers de 40mm con sonido firmado por ingenieros, ANC adaptativo y micrófono con beamforming para llamadas claras incluso en cafeterías ruidosas.",
    tags: ["audífonos", "bluetooth", "música", "trabajo remoto", "viaje"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: "smartwatch-fit-7",
    name: "Smartwatch FitTrack 7",
    brand: "Pulso",
    category: "Electrónicos",
    price: 1899,
    rating: 4.5,
    reviews: 678,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=900&q=80",
    shortDescription:
      "Reloj inteligente con GPS, ritmo cardíaco y resistencia al agua 5ATM.",
    longDescription:
      "Más de 100 modos deportivos, monitor de sueño y oxígeno en sangre, notificaciones de WhatsApp y batería de 14 días.",
    tags: ["smartwatch", "fitness", "salud", "deporte", "gps"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: "playera-tecnica-dry",
    name: "Playera Técnica DryFlex Hombre",
    brand: "AeroSport",
    category: "Ropa",
    price: 349,
    rating: 4.3,
    reviews: 226,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
    shortDescription:
      "Playera de secado rápido para entrenar bajo el sol.",
    longDescription:
      "Tejido con tecnología que aleja el sudor de la piel y bloquea rayos UV. Costuras planas para evitar rozaduras en sesiones largas.",
    tags: ["playera", "deportivo", "verano", "calor", "uv"],
    inStock: true,
    freeShipping: false,
  },
  {
    id: "vestido-floral-verano",
    name: "Vestido Floral Verano Brisa",
    brand: "Costa Look",
    category: "Ropa",
    price: 599,
    oldPrice: 799,
    rating: 4.8,
    reviews: 304,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&q=80",
    shortDescription: "Vestido ligero ideal para clima cálido y playa.",
    longDescription:
      "Tela viscosa con caída suave, estampado floral y silueta favorecedora. Perfecto para escapadas a Mazatlán o un brunch en domingo.",
    tags: ["vestido", "verano", "playa", "mujer", "casual"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: "mochila-laptop-15",
    name: 'Mochila Antirrobo para Laptop 15"',
    brand: "Vaultpack",
    category: "Accesorios",
    price: 749,
    rating: 4.6,
    reviews: 519,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80",
    shortDescription:
      "Compartimento acolchado, puerto USB y cierres ocultos.",
    longDescription:
      "Compartimento dedicado para laptop hasta 15.6\", organizador interno, espalda transpirable y puerto USB para cargar tu celular en el camino.",
    tags: ["mochila", "laptop", "trabajo", "estudiante", "viaje"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: "lampara-escritorio-led",
    name: "Lámpara LED de Escritorio Foco Cálido",
    brand: "LumaHome",
    category: "Hogar",
    price: 459,
    rating: 4.5,
    reviews: 168,
    image:
      "https://images.unsplash.com/photo-1565636192335-989ad60bbcd7?w=900&q=80",
    shortDescription:
      "Brazo articulado, atenuación táctil y temperatura ajustable.",
    longDescription:
      "3 modos de color (cálido, neutro, frío), 5 niveles de brillo y temporizador. Cuida la vista en jornadas largas frente al monitor.",
    tags: ["lámpara", "led", "escritorio", "trabajo", "estudio"],
    inStock: true,
    freeShipping: false,
  },
  {
    id: "cafetera-french-press",
    name: "Cafetera French Press 1L Vidrio Borosilicato",
    brand: "Brewlab",
    category: "Hogar",
    price: 389,
    rating: 4.7,
    reviews: 412,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80",
    shortDescription:
      "Café denso y aromático sin filtros desechables.",
    longDescription:
      "Vidrio resistente al calor, doble malla de acero inoxidable y mango ergonómico. Ritual perfecto para mañanas tranquilas.",
    tags: ["café", "cocina", "francesa", "regalo"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: "perfume-mar-edt",
    name: "Perfume Mar EDT 100ml",
    brand: "Costa",
    category: "Belleza",
    price: 999,
    oldPrice: 1399,
    rating: 4.6,
    reviews: 287,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=80",
    shortDescription: "Notas frescas marinas con un toque cítrico.",
    longDescription:
      "Salida de bergamota y limón siciliano, corazón marino con notas acuáticas, fondo de almizcle blanco y cedro.",
    tags: ["perfume", "fresco", "marino", "regalo"],
    inStock: true,
    freeShipping: true,
  },
  {
    id: "pelota-yoga-65",
    name: "Pelota de Yoga 65cm Antiexplosión",
    brand: "FlexCore",
    category: "Deportes",
    price: 299,
    rating: 4.4,
    reviews: 198,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
    shortDescription:
      "PVC reforzado, soporta hasta 300 kg. Incluye bomba.",
    longDescription:
      "Ideal para yoga, pilates, embarazo y rehabilitación. Superficie antiderrapante y válvula de seguridad.",
    tags: ["yoga", "pilates", "fitness", "casa"],
    inStock: true,
    freeShipping: false,
  },
  {
    id: "lentes-sol-aviador",
    name: "Lentes de Sol Aviador Polarizados",
    brand: "Solar",
    category: "Accesorios",
    price: 549,
    rating: 4.5,
    reviews: 322,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=900&q=80",
    shortDescription:
      "Protección UV400 con lentes polarizados antirreflejantes.",
    longDescription:
      "Marco metálico ligero, almohadillas de silicón y micas polarizadas que reducen el deslumbramiento en la playa o manejando.",
    tags: ["lentes", "sol", "playa", "verano", "polarizado"],
    inStock: true,
    freeShipping: true,
  },
];

export const categories: Category[] = [
  "Calzado",
  "Ropa",
  "Electrónicos",
  "Hogar",
  "Accesorios",
  "Belleza",
  "Deportes",
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Resumen compacto para inyectar como contexto a la IA. */
export function productsAsContext(items: Product[] = products): string {
  return items
    .map(
      (p) =>
        `[${p.id}] ${p.name} — ${p.category} · ${p.brand} · $${p.price} MXN${
          p.oldPrice ? ` (antes $${p.oldPrice})` : ""
        } · ${p.rating}★ (${p.reviews} reseñas) · ${p.inStock ? "en stock" : "agotado"} · ${
          p.freeShipping ? "envío gratis" : "envío con costo"
        }\n   ${p.shortDescription}\n   tags: ${p.tags.join(", ")}`,
    )
    .join("\n");
}

/** Búsqueda léxica muy simple usada por el modo demo y como ranker auxiliar. */
export function searchProducts(query: string, limit = 4): Product[] {
  const q = query.toLowerCase();
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);
  const scored = products.map((p) => {
    const haystack = [
      p.name,
      p.brand,
      p.category,
      p.shortDescription,
      p.longDescription,
      ...p.tags,
    ]
      .join(" ")
      .toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (haystack.includes(t)) score += 1;
      if (p.tags.some((tag) => tag.toLowerCase() === t)) score += 1.5;
      if (p.name.toLowerCase().includes(t)) score += 1;
    }
    return { p, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}
