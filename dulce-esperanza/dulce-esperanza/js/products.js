// Datos de productos para Dulce Esperanza
const saltyProducts = [
    { 
        id: 1, 
        name: "Pan", 
        cant: "2 unidades", 
        weight: "100g", 
        price: 1000, 
        available: true, 
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "salado"
    },
    { 
        id: 2, 
        name: "Pan con Chicharrón", 
        cant: "2 unidades", 
        weight: "100g", 
        price: 1800, 
        available: true, 
        image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2879?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "salado",
        occasional: true
    },
    { 
        id: 3, 
        name: "Pan Integral", 
        cant: "2 unidades", 
        weight: "100g", 
        price: 1600, 
        available: true, 
        image: "https://images.unsplash.com/photo-1598373182131-33d21f43700f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "salado"
    },
    { 
        id: 4, 
        name: "Galletas", 
        cant: "Peso variado", 
        weight: "1300-1700g", 
        price: 1500, 
        available: true, 
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "salado"
    },
    { 
        id: 5, 
        name: "Bizcochitos", 
        cant: "Unidades variadas", 
        weight: "100g", 
        price: 2000, 
        available: true, 
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "salado"
    },
    { 
        id: 6, 
        name: "Bizcochitos con Queso", 
        cant: "Unidades variadas", 
        weight: "100g", 
        price: 1300, 
        available: true, 
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "salado"
    },
    { 
        id: 7, 
        name: "Chipa", 
        cant: "Unidades variadas", 
        weight: "250g", 
        price: 1500, 
        available: true, 
        image: "https://images.unsplash.com/photo-1623334044303-241021148842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "salado",
        occasional: true
    },
    { 
        id: 8, 
        name: "Cremona", 
        cant: "1 unidad", 
        weight: "Peso variable", 
        price: 1550, 
        available: true, 
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "salado"
    }
];

const sweetProducts = [
    { 
        id: 9, 
        name: "Galletitas Pepas", 
        cant: "Unidades variadas", 
        weight: "100g", 
        price: 2250, 
        available: true, 
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "dulce",
        occasional: true
    },
    { 
        id: 10, 
        name: "Galletitas de Miel", 
        cant: "Unidades variadas", 
        weight: "100g", 
        price: 2250, 
        available: true, 
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "dulce",
        occasional: true
    },
    { 
        id: 11, 
        name: "Palmeritas", 
        cant: "Unidades variadas", 
        weight: "100g", 
        price: 1800, 
        available: true, 
        image: "https://images.unsplash.com/photo-1623334044303-241021148842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "dulce",
        occasional: true
    },
    { 
        id: 12, 
        name: "Facturas", 
        cant: "2 unidades", 
        weight: "100g", 
        price: 1300, 
        available: true, 
        image: "https://images.unsplash.com/photo-1555507036-ab794f27d2e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "dulce"
    },
    { 
        id: 13, 
        name: "Medialunas Azucaradas", 
        cant: "Unidades variadas", 
        weight: "100g", 
        price: 1300, 
        available: true, 
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "dulce"
    }
];

// Combinar todos los productos
const allProducts = [...saltyProducts, ...sweetProducts];