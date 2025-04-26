// cart.js
document.addEventListener('DOMContentLoaded', () => {
  // 购物车数据存储
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // 事件委托处理添加购物车
  document.querySelector('.photo-grid').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
      const item = getCartItemData(e.target.closest('.photo-item'));
      addToCart(item);
      updateCartUI();
    }
  });

  // 查看购物车
  document.querySelector('.btn-view-cart').addEventListener('click', () => {
    showCartModal();
  });

  // 获取商品数据
  function getCartItemData(itemElement) {
    return {
      id: itemElement.querySelector('img').src,
      name: itemElement.querySelector('img').alt,
      price: 0, // 需要添加 data-price 属性
      quantity: 1
    };
  }

  // 添加到购物车
  function addToCart(item) {
    const existingItem = cart.find(i => i.id === item.id);
    existingItem ? existingItem.quantity++ : cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // 更新购物车 UI
  function updateCartUI() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBtn = document.querySelector('.btn-view-cart');
    cartBtn.dataset.count = cartCount || '';
  }

  // 显示购物车模态框
  function showCartModal() {
    const modalHTML = `
      <div class="cart-modal">
        <div class="cart-content">
          <h3>Your Cart (${cart.length} items)</h3>
          ${generateCartItems()}
          <div class="cart-actions">
            <button class="btn btn-clear-all">Clear All</button>
            <button class="btn btn-checkout">Checkout</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    addModalEvents();
  }

  // 生成购物车商品列表
  function generateCartItems() {
    return cart.map(item => `
      <div class="cart-item">
        <img src="${item.id}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>Quantity: ${item.quantity}</p>
        </div>
      </div>
    `).join('');
  }

  // 模态框事件处理
  function addModalEvents() {
    // 清空购物车
    document.querySelector('.btn-clear-all').addEventListener('click', () => {
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
      document.querySelector('.cart-modal').remove();
    });

    // 结账（保持原逻辑）
    document.querySelector('.btn-checkout').addEventListener('click', () => {
      // TODO: 跳转到结账页或其他处理
      alert('Proceeding to checkout...');
      document.querySelector('.cart-modal').remove();
    });

    // 点击外部或按 Esc 关闭
    const modal = document.querySelector('.cart-modal');
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
    document.addEventListener('keydown', function onEsc(e) {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', onEsc);
      }
    });
  }

  // 初始化更新 UI
  updateCartUI();
});
