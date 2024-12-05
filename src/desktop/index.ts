import styles from './index.module.css';

kintone.events.on('app.record.index.show', (e) => {
  console.log('Event: app.record.index.show');
  createHeaderElement();
});

function createHeaderElement() {
  const divElement = document.createElement('div');
  divElement.textContent = 'Hello World';
  divElement.classList.add(styles.headerElement);
  const element = kintone.app.getHeaderMenuSpaceElement();

  element?.appendChild(divElement);
}
