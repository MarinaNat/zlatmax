// Подключение функционала "Чертогов Фрилансера"
// import { isMobile } from "./functions.js";
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

document.addEventListener("click", documentActions);

const menuBloks = document.querySelectorAll('.sub-menu-catalog__block');
if (menuBloks.length) {
  menuBloks.forEach(menuBlok => {
    const menuBlockItems = menuBlok.querySelectorAll('.sub-menu-catalog__category').length;
    menuBlok.classList.add(`sub-menu-catalog__block_${menuBlockItems}`);
  })
}

function documentActions(e) {
  const targetElement = e.target;
  if (targetElement.closest('[data-parent]')) {
    const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
    const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
    const catalogMenu = document.querySelector('.catalog-header');
    if (subMenu) {
      const activeLInk = document.querySelector('._sub-menu-active');
      const activeBloc = document.querySelector('._sub-menu-open');

      if (activeLInk && activeLInk !== targetElement) {
        activeLInk.classList.remove('_sub-menu-active');
        activeBloc.classList.remove('_sub-menu-open');
      }
      targetElement.classList.toggle('_sub-menu-active')
      subMenu.classList.toggle('_sub-menu-open');
    } else {
      console.log('Ой ой, нет такого подменю :(');
    }
    e.preventDefault();
  }
  if (targetElement.closest('.menu-top-header__link_catalog')) {
    // const catalogLink = targetElement.closest('.menu-top-header__link_catalog')
    document.documentElement.classList.add('catalog-open')
    e.preventDefault()
  }
}
