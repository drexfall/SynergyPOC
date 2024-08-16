import { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { generateRandomId } from './utility';

const GrapesJSEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      fromElement: true,
      width: 'auto',
      height: '100vh',
      storageManager: false,
      canvas: {
        styles: [
          'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css', // Add Tailwind CSS CDN link here
        ],
      },
    });

    editor.Components.addType('custom-columns', {
      model: {
        defaults: {
          tagName: 'div',
          draggable: true,
          droppable: true,
          attributes: { class: 'grid gap-4 p-4' },
          columns: 1,
          traits: [
            {
              type: 'number',
              label: 'Columns',
              name: 'columns',
              changeProp: 1,
            },
          ],
        },
        init() {
          this.listenTo(this, 'change:columns', this.updateColumns);
          this.updateColumns();
        },
        updateColumns() {
          const columns = this.get('columns');
          const colClass = `grid-cols-${columns}`;
          this.set('attributes', { class: `grid p-4 ${colClass}` });
    
          const children = this.components();
          const currentCount = children.length;
    
          if (columns > currentCount) {
            for (let i = currentCount; i < columns; i++) {
              children.add({ type: 'default', tagName: 'div', attributes: { class: 'col' } });
            }
          } else if (columns < currentCount) {
            for (let i = currentCount - 1; i >= columns; i--) {
              children.at(i).remove();
            }
          }
        },
      },
      view: {
        onRender() {
          this.model.updateColumns();
        },
      },
    });

    editor.DomComponents.addType('input', {
      model: {
        defaults: {
          tagName: 'input',
          draggable: true,
          droppable: false,
          attributes: {
            class: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
          },
          traits: [
            {
              type: 'select',
              label: 'Type',
              name: 'type',
              options: [
                { value: 'text', name: 'Text' },
                { value: 'email', name: 'Email' },
                { value: 'number', name: 'Number' },
                { value: 'hidden', name: 'Hidden' },
                { value: 'password', name: 'Password' },
              ],
              value: 'text',
            },
            {
              type: 'text',
              label: 'Name',
              name: 'name',
            },
            {
              type: 'text',
              label: 'Placeholder',
              name: 'placeholder',
              value: 'Input Field',
            },
            {
              type: 'text',
              label: 'Value',
              name: 'value',
            },
            {
              type: 'checkbox',
              label: 'Disabled',
              name: 'disabled',
              changeProp: 1,
            },
          ],
        },
        init() {
          this.listenTo(this, 'change:disabled', this.updateDisabled);
        },
        updateDisabled() {
          const disabled = this.get('disabled');
          const el = this.view?.el;
          if (el) {
            el.disabled = disabled;
          }
        },
      },
      view: {
        onRender() {
          this.model.updateDisabled();
        },
      },
    });

    editor.DomComponents.addType('custom-label', {
      model: {
        defaults: {
          tagName: 'label',
          droppable: false,
          draggable: true,
          attributes: { class: 'block text-sm font-medium text-gray-700' },
          content: 'Label Text',
          traits: [
            {
              type: 'text',
              label: 'Label',
              name: 'labelText',
              changeProp: 1,
            },
          ],
        },
        init() {
          this.listenTo(this, 'change:labelText', this.updateContent);
        },
        updateContent() {
          const content = this.get('labelText');
          this.components(content);
        },
      },
      view: {
        onRender() {
          this.model.updateContent();
        },
      },
    });

    editor.DomComponents.addType('custom-select', {
      model: {
        defaults: {
          tagName: 'div',
          droppable: false,
          draggable: true,
          attributes: { class: 'select-wrapper' },
          components: `
            <label class="block text-sm font-medium text-gray-700">Select Item</label>
            <select class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Loading...</option>
            </select>
          `,
          traits: [
            {
              type: 'text',
              label: 'API URL',
              name: 'apiUrl',
              changeProp: 1,
            },
            {
              type: 'text',
              label: 'Column Name',
              name: 'columnName',
              changeProp: 1,
            },
          ],
        },
        init() {
          this.listenTo(this, 'change:apiUrl', this.fetchData);
          this.listenTo(this, 'change:columnName', this.fetchData);
          this.fetchData();
        },
        fetchData() {
          const apiUrl = this.get('apiUrl');
          const columnName = this.get('columnName');
          const selectEl = this.view?.el.querySelector('select');
    
          if (apiUrl && columnName && selectEl) {
            fetch(apiUrl)
              .then(response => response.json())
              .then(data => {
                selectEl.innerHTML = '';
                data.forEach(item => {
                  const option = document.createElement('option');
                  option.value = item[columnName];
                  option.textContent = item[columnName];
                  selectEl.appendChild(option);
                });
              })
              .catch(error => {
                console.error('Error fetching data:', error);
                selectEl.innerHTML = '<option>Error loading data</option>';
              });
          }
        },
      },
      view: {
        onRender() {
          this.model.fetchData();
        },
      },
    });

    const blocks = [
      {
        id: generateRandomId(),
        label: 'Custom Columns',
        content: { type: 'custom-columns' },
        category: 'Layout',
      },
      {
        id: generateRandomId(),
        label: 'Input Field',
        content: { type: 'input' },
        category: 'General',
      },    
      {
        id: generateRandomId(),
        label: 'Label',
        content: { type: 'custom-label' },
        category: 'General',
      },
      {
        id: generateRandomId(),
        label: 'Select Item',
        content: { type: 'custom-select' },
        category: 'General',
      },
    ]

    blocks.forEach(block => {
      editor.BlockManager.add(block.id, block);
    });

    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={editorRef}></div>
    </div>
  );
};

export default GrapesJSEditor;
