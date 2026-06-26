//* Datos de proyectos sincronizados con index.html.

const projects = [
  {
    id: 12,
    title: 'Caniles Parque Thays',
    category: 'urbano',
    tags: ['Proyecto y dirección de obra'],
    description: 'Puesta en valor de caniles en Parque Thays (proyecto y dirección de obra). Proyecto real (2026).',
    behanceUrl: 'https://www.behance.net/gallery/247725239/Renovacion-caniles-Parque-Thays-%28CABA%29',
    image: 'images/projects/parque-thays/preview.jpg',
    imageAlt: 'Caniles Parque Thays'
  },
  {
    id: 11,
    title: 'Estación deportiva Plaza Rubén Darío',
    category: 'urbano',
    tags: ['Proyecto y dirección de obra'],
    description: 'Estación deportiva en Plaza Rubén Darío (proyecto y dirección de obra). Proyecto real (2026).',
    behanceUrl: 'https://www.behance.net/gallery/247724323/Estacion-deportiva-Rubn-Dario-%28CABA%29',
    image: 'images/projects/plaza-ruben-dario/preview.jpg',
    imageAlt: 'Estación deportiva Plaza Rubén Darío'
  },
  {
    id: 10,
    title: 'Puesta en valor Plaza Borges',
    category: 'urbano',
    tags: ['Proyecto y dirección de obra'],
    description: 'Puesta en valor cultural en Plaza Jorge L. Borges (proyecto y dirección de obra). Proyecto real (2025/2026).',
    behanceUrl: 'https://www.behance.net/gallery/247723131/Puesta-en-valor-Plaza-Jorge-L-Borges-%28CABA%29',
    image: 'images/projects/plaza-borges/preview.jpg',
    imageAlt: 'Puesta en valor Plaza Borges'
  },
  {
    id: 9,
    title: 'Sector deportivo Plaza Houssay',
    category: 'urbano',
    tags: ['Proyecto y dirección de obra'],
    description: 'Intervención sector deportivo ubicado en Plaza Houssay (proyecto y dirección de obra). Proyecto real (2025).',
    behanceUrl: 'https://www.behance.net/gallery/247721249/Sector-deportivo-Plaza-Houssay-%28CABA%29',
    image: 'images/projects/plaza-houssay/preview.jpg',
    imageAlt: 'Sector deportivo Plaza Houssay'
  },
  {
    id: 8,
    title: 'Centro de formación científica',
    category: 'institucional',
    tags: ['Proyecto universitario'],
    description: 'Centro científico ubicado en Bahía Blanca (proyecto propio). Proyecto universitario para Proyecto Arquitectónico (2025).',
    behanceUrl: 'https://www.behance.net/gallery/240788631/Centro-de-formacion-cientifica-Bahia-Blanca',
    image: 'images/projects/proyecto-centro-cientifico/preview.jpg',
    imageAlt: 'Centro de formación científica'
  },
  {
    id: 7,
    title: 'Parque agroproductivo',
    category: 'urbano',
    tags: ['Proyecto universitario'],
    description: 'Parque agroproductivo ubicado en Viedma (proyecto propio). Proyecto universitario para Proyecto Urbano (2025).',
    behanceUrl: 'https://www.behance.net/gallery/240786641/Parque-agroproductivo-Viedma',
    image: 'images/projects/proyecto-parque-agroproductivo/preview.jpg',
    imageAlt: 'Parque agroproductivo'
  },
  {
    id: 6,
    title: 'Centro multiprogramático',
    category: 'urbano',
    tags: ['Proyecto universitario'],
    description: 'Centro multiprogramático ubicado en Punta Lara (proyecto propio). Proyecto universitario para Diseño IV (2024).',
    behanceUrl: 'https://www.behance.net/gallery/219425721/Condensador-urbano-Punta-Lara',
    image: 'images/projects/proyecto-condensador-urbano/preview.jpg',
    imageAlt: 'Centro multiprogramático'
  },
  {
    id: 5,
    title: 'Centro integral',
    category: 'institucional',
    tags: ['Proyecto universitario'],
    description: 'Complejo multidisciplinario ubicado en la Isla Martín García (proyecto propio). Proyecto universitario para Diseño IV (2024).',
    behanceUrl: 'https://www.behance.net/gallery/206097727/Centro-integral-Isla-Martin-Garcia',
    image: 'images/projects/proyecto-centro-integral/preview.jpg',
    imageAlt: 'Centro integral'
  },
  {
    id: 4,
    title: 'Diseño de interiores PH',
    category: 'residencial',
    tags: ['Proyecto y contacto con proveedores'],
    description: 'Diseño de interiores para PH ubicado en Villa Crespo, CABA (proyecto propio). Proyecto y contacto con proveedores (2024).',
    behanceUrl: 'https://www.behance.net/gallery/196214019/Diseno-Interiores-PH-%28CABA%29',
    image: 'images/projects/proyecto-diseño-ph/preview.jpg',
    imageAlt: 'Diseño de interiores PH'
  },
  {
    id: 3,
    title: 'Complejo enológico',
    category: 'institucional',
    tags: ['Proyecto universitario'],
    description: 'Bodega implantada sobre la montaña, ubicada en Cafayate, Salta (proyecto propio). Proyecto universitario para Diseño III (2023).',
    behanceUrl: 'https://www.behance.net/gallery/192672761/Bodega-Cafayate-Salta',
    image: 'images/projects/proyecto-bodega/preview.jpg',
    imageAlt: 'Complejo enológico'
  },
  {
    id: 2,
    title: 'Complejo hotelero y cultural',
    category: 'institucional',
    tags: ['Proyecto universitario'],
    description: 'Hotel con exposiciones de artista local, ubicado en Cafayate, Salta (proyecto propio). Proyecto universitario para Diseño III (2023).',
    behanceUrl: 'https://www.behance.net/gallery/192670781/Hotel-Museo-Cafayate-Salta',
    image: 'images/projects/proyecto-hotel-museo/preview.jpg',
    imageAlt: 'Complejo hotelero y cultural'
  },
  {
    id: 1,
    title: 'Edificio residencial Oasis urbano',
    category: 'residencial',
    tags: ['Proyecto universitario'],
    description: 'Edificio de locales, oficinas y viviendas, ubicado en Montserrat (proyecto propio). Proyecto universitario para Diseño II (2022).',
    behanceUrl: 'https://www.behance.net/gallery/158943687/Edificio-El-Oasis-Montserrat',
    image: 'images/projects/proyecto-el-oasis/preview.jpg',
    imageAlt: 'Edificio residencial Oasis urbano'
  },
];

// Exportar para uso en módulos (Node.js / bundlers)
if (typeof module !== 'undefined') { module.exports = projects; }
