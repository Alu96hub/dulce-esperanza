// 🔗 URL de tu Google Apps Script
const API_URL = 'https://script.google.com/macros/s/AKfycbwGrEPoBX_CicQDWyaylBCQgz7kqVrhA1Uw-EqQi8t5SunvTG2q6A2a27HhhO510SzP/dev';

// 🛒 Carrito de compras
let cart = [];

// 📞 Elementos del DOM
const saltyProductsGrid = document.getElementById('saltyProductsGrid');
const sweetProductsGrid = document.getElementById('sweetProductsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.querySelector('.cart-count');

// 🚀 Inicializar la página
document.addEventListener('DOMContentLoaded', async () => {
    await cargarProductosDesdeAPI();
    updateCartCount();
    cartIcon.addEventListener('click', showCartNotification);
});

// 📦 Cargar productos desde Google Sheets
async function cargarProductosDesdeAPI() {
    try {
        console.log('🔄 Cargando productos desde API...');
        const response = await fetch(`${API_URL}?action=obtenerProductos`);
        const result = await response.json();
        console.log('📦 Productos cargados:', result);
        
        if (result.status === 'success') {
            // Limpiar grids
            saltyProductsGrid.innerHTML = '';
            sweetProductsGrid.innerHTML = '';
            
            // Renderizar productos
            result.data.forEach(producto => {
                const productCard = crearProductCardDesdeAPI(producto);
                
                if (producto.Categoría === 'Salado') {
                    saltyProductsGrid.appendChild(productCard);
                } else {
                    sweetProductsGrid.appendChild(productCard);
                }
            });
            
            showNotification('✅ Productos cargados correctamente');
        } else {
            throw new Error(result.data);
        }
    } catch (error) {
        console.error('❌ Error cargando productos:', error);
        showNotification('⚠️ Error cargando productos. Usando datos locales.');
        // Fallback a productos locales
        renderProductsLocal();
    }
}

// 🎴 Crear tarjeta de producto desde datos API
function crearProductCardDesdeAPI(producto) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    const disponible = producto.Stock_Dia > 0;
    const esOcasional = producto.Tipo === 'Ocasional';
    
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${obtenerImagenProducto(producto.Nombre)}" alt="${producto.Nombre}">
            <div class="product-availability ${disponible ? '' : 'unavailable'}">
                ${disponible ? 'Disponible' : 'No Disponible'}
            </div>
            ${esOcasional ? '<div class="product-availability" style="top: 45px; background-color: var(--primary);">Ocasional</div>' : ''}
        </div>
        <div class="product-info">
            <h3>${producto.Nombre}</h3>
            <div class="product-details">
                <div class="product-cant">${producto.Descripción}</div>
                <div class="product-weight">Stock: ${producto.Stock_Dia} unidades</div>
            </div>
            <div class="product-price">$${producto.Precio_Base}</div>
            <div class="quantity-selector">
                <button class="quantity-btn" onclick="changeQuantityAPI(${producto.ID}, -1)">-</button>
                <input type="number" class="quantity-input" id="quantity-${producto.ID}" value="1" min="1" max="${producto.Stock_Dia}">
                <button class="quantity-btn" onclick="changeQuantityAPI(${producto.ID}, 1)">+</button>
            </div>
            <button class="add-to-cart" onclick="addToCartAPI(${producto.ID})" ${!disponible ? 'disabled' : ''}>
                ${disponible ? '🛒 Agregar al Carrito' : '❌ Sin Stock'}
            </button>
        </div>
    `;
    return productCard;
}

// 🖼️ Obtener imagen según producto
function obtenerImagenProducto(nombre) {
    const imagenes = {
        'Pan': 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'Pan con Chicharrón': 'https://images.unsplash.com/photo-1568254183919-78a4f43a2879?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'Pan Integral': 'https://images.unsplash.com/photo-1598373182131-33d21f43700f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'Galletas': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'Bizcochitos': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'Bizcochitos con Queso': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'Chipa': 'https://images.unsplash.com/photo-1623334044303-241021148842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'Cremona': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'Galletitas Pepas': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'Galletitas de Miel': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'Palmeritas': 'https://images.unsplash.com/photo-1623334044303-241021148842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'Facturas': 'https://images.unsplash.com/photo-1555507036-ab794f27d2e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'Medialunas Azucaradas': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    };
    return imagenes[nombre] || 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
}

// 🔢 Cambiar cantidad para productos API
function changeQuantityAPI(productId, change) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    let newValue = parseInt(quantityInput.value) + change;
    
    if (newValue < 1) newValue = 1;
    
    quantityInput.value = newValue;
}

// 🛒 Agregar al carrito desde API
async function addToCartAPI(productId) {
    try {
        // Obtener información del producto
        const response = await fetch(`${API_URL}?action=obtenerProductos`);
        const result = await response.json();
        
        if (result.status !== 'success') {
            throw new Error('Error obteniendo producto');
        }
        
        const producto = result.data.find(p => p.ID == productId);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        
        const quantityInput = document.getElementById(`quantity-${productId}`);
        const quantity = parseInt(quantityInput.value);
        
        if (quantity > producto.Stock_Dia) {
            showNotification(`⚠️ Solo hay ${producto.Stock_Dia} unidades disponibles`);
            return;
        }
        
        if (quantity <= 0) {
            showNotification('❌ La cantidad debe ser mayor a 0');
            return;
        }
        
        // Verificar si el producto ya está en el carrito
        const existingItemIndex = cart.findIndex(item => item.id == productId);
        
        if (existingItemIndex !== -1) {
            // Si ya existe, actualizar la cantidad
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Si no existe, agregar nuevo item
            cart.push({
                id: producto.ID,
                name: producto.Nombre,
                price: producto.Precio_Base,
                quantity: quantity,
                image: obtenerImagenProducto(producto.Nombre)
            });
        }
        
        // Resetear cantidad
        quantityInput.value = 1;
        
        updateCartCount();
        showNotification(`✅ ${producto.Nombre} agregado al carrito`);
        
    } catch (error) {
        console.error('❌ Error agregando al carrito:', error);
        showNotification('❌ Error agregando producto al carrito');
    }
}

// 💾 Guardar pedido en Google Sheets
async function guardarPedido(cliente, pedido) {
    try {
        console.log('📤 Enviando pedido a API...', { cliente, pedido });
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'procesarPedido',
                cliente: cliente,
                pedido: pedido
            })
        });
        
        const result = await response.json();
        console.log('📥 Respuesta API:', result);
        return result;
        
    } catch (error) {
        console.error('❌ Error guardando pedido:', error);
        return { status: 'error', message: 'Error de conexión: ' + error.message };
    }
}

// 🎯 Función para proceder al checkout
async function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('🛒 Tu carrito está vacío');
        return;
    }
    
    // Datos de ejemplo - LUEGO REEMPLAZAR con formulario real
    const cliente = {
        telefono: '+5493435345362',
        nombre: 'Cliente de Prueba',
        direccion: 'Calle Ejemplo 123, María Grande, Entre Ríos',
        zona: 'Centro'
    };
    
    const pedido = {
        fechaEntrega: new Date().toISOString().split('T')[0],
        productos: cart,
        total: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
        metodoPago: 'efectivo'
    };
    
    showNotification('📤 Enviando pedido...');
    
    const resultado = await guardarPedido(cliente, pedido);
    
    if (resultado.status === 'success') {
        showNotification(`✅ ¡Pedido registrado exitosamente! ID: ${resultado.data.idPedido}`);
        cart = [];
        updateCartCount();
        
        // Redirigir a WhatsApp para confirmación
        const mensajeWhatsApp = `Hola! Acabo de hacer un pedido en Dulce Esperanza. ID: ${resultado.data.idPedido}. Total: $${pedido.total}`;
        const urlWhatsApp = `https://wa.me/5493435345362?text=${encodeURIComponent(mensajeWhatsApp)}`;
        window.open(urlWhatsApp, '_blank');
        
    } else {
        showNotification(`❌ Error al registrar pedido: ${resultado.message}`);
    }
}

// 📊 Actualizar contador del carrito
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// 🔔 Mostrar notificación
function showNotification(message) {
    // Eliminar notificación anterior si existe
    const notificacionAnterior = document.querySelector('.notification-temp');
    if (notificacionAnterior) {
        notificacionAnterior.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification-temp';
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
        transition: all 0.3s ease;
        transform: translateX(100%);
        opacity: 0;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// 📱 Mostrar notificación del carrito
function showCartNotification() {
    if (cart.length === 0) {
        showNotification('🛒 Tu carrito está vacío');
    } else {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const totalPrecio = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        showNotification(`🛒 Tienes ${totalItems} productos (Total: $${totalPrecio}). Usa el botón "Continuar con la Compra" para finalizar.`);
    }
}

// 🧭 Función para desplazarse al menú
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

// 🎴 Renderizado local de productos (fallback)
function renderProductsLocal() {
    // Código de respaldo por si la API falla
    showNotification('⚠️ Usando productos de respaldo');
    // Aquí irían tus productos locales originales
}

// Productos locales como respaldo
const saltyProducts = [];
const sweetProducts = [];

// 🎉 Hacer función global para el botón de checkout
window.proceedToCheckout = proceedToCheckout;
window.changeQuantityAPI = changeQuantityAPI;
window.addToCartAPI = addToCartAPI;
