// Carrito de compras
let cart = [];

// Elementos del DOM
const saltyProductsGrid = document.getElementById('saltyProductsGrid');
const sweetProductsGrid = document.getElementById('sweetProductsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.querySelector('.cart-count');

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    
    // Event listeners
    cartIcon.addEventListener('click', showCartNotification);
});

// Renderizar productos
function renderProducts() {
    renderProductCategory(saltyProducts, saltyProductsGrid);
    renderProductCategory(sweetProducts, sweetProductsGrid);
}

// Renderizar productos por categoría
function renderProductCategory(products, gridElement) {
    gridElement.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        gridElement.appendChild(productCard);
    });
}

// Crear tarjeta de producto
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-availability ${product.available ? '' : 'unavailable'}">
                ${product.available ? 'Disponible' : 'No Disponible'}
            </div>
            ${product.occasional ? '<div class="product-availability" style="top: 45px; background-color: var(--primary);">Ocasional</div>' : ''}
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-details">
                <div class="product-cant">Cantidad: ${product.cant}</div>
                <div class="product-weight">Peso: ${product.weight}</div>
            </div>
            <div class="product-price">$${product.price}</div>
            <div class="quantity-selector">
                <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">-</button>
                <input type="number" class="quantity-input" id="quantity-${product.id}" value="1" min="1">
                <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})" ${!product.available ? 'disabled' : ''}>
                ${product.available ? 'Agregar al Carrito' : 'No Disponible'}
            </button>
        </div>
    `;
    
    return productCard;
}

// Cambiar cantidad de producto
function changeQuantity(productId, change) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    let newValue = parseInt(quantityInput.value) + change;
    
    if (newValue < 1) newValue = 1;
    
    quantityInput.value = newValue;
}

// Agregar producto al carrito
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);
    
    if (!product.available) return;
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        // Si ya existe, actualizar la cantidad
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Si no existe, agregar nuevo item
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        });
    }
    
    // Resetear cantidad
    quantityInput.value = 1;
    
    updateCartCount();
    showNotification(`${product.name} agregado al carrito`);
}

// Actualizar contador del carrito
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--success);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        z-index: 1001;
        transition: transform 0.3s, opacity 0.3s;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mostrar notificación del carrito
function showCartNotification() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
    } else {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        showNotification(`Tienes ${totalItems} productos en el carrito`);
    }
}

// Función para desplazarse al menú
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

// Función para obtener el carrito (para uso futuro)
function getCart() {
    return cart;
}

// Función para limpiar el carrito (para uso futuro)
function clearCart() {
    cart = [];
    updateCartCount();
}