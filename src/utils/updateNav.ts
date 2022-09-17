export default function updateNav(pageID: string) {
  const navItems = document.querySelector('#header__navigation')?.childNodes[0].childNodes;
  navItems?.forEach((item) => {
    (item.firstChild as Element).classList.remove('active');
    if ((item.firstChild as Element).id === pageID) {
      (item.firstChild as Element).classList.add('active');
    }
  });
}
