import { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { generateRandomId } from './utility';

const allKeys = new Set();
const allNames = new Set();

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

    const commonTraits = [
      {
        type: 'text',
        label: 'Key',
        name: 'key',
        changeProp: 1,
      },
    ];

    const formTraits = [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
        changeProp: 1,
      },
    ];

    editor.DomComponents.addType('custom-columns', {
      model: {
        defaults: {
          tagName: 'div',
          droppable: false,
          draggable: true,
          attributes: { class: 'grid gap-4 p-4' },
          columns: 2,
          traits: [
            ...commonTraits,
            {
              type: 'number',
              label: 'Number of Columns',
              name: 'columns',
              changeProp: 1,
              min: 1,
              max: 12,
            },
          ],
        },
        init() {
          this.listenTo(this, 'change:columns', this.updateColumns);
          this.listenTo(this, 'change:key', this.validateKey);
          this.updateColumns();
        },
        validateKey() {
          validateKey(this);
        },
        updateColumns() {
          const columns = this.get('columns') || 2;
          const colClass = `grid-cols-${columns}`;
          this.set('attributes', { class: `grid ${colClass} gap-4 p-4` });

          // Clear existing columns
          this.components().reset();

          // Add new columns with containers
          for (let i = 0; i < columns; i++) {
            this.append({
              type: 'default',
              tagName: 'div',
              attributes: { class: 'col-span-1' },
              components: [
                {
                  type: 'custom-container',
                },
              ],
            });
          }
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
            ...commonTraits,
            ...formTraits,
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
          this.listenTo(this, 'change:key', this.validateKey);
          this.listenTo(this, 'change:name', this.validateName);
        },
        validateKey() {
          validateKey(this);
        },
        validateName() {
          validateName(this);
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
            ...commonTraits,
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
          this.listenTo(this, 'change:key', this.validateKey);
        },
        validateKey() {
          validateKey(this);
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
          tagName: 'select',
          droppable: true,
          draggable: true,
          attributes: { class: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' },
          components: '<option>--Select--</option>',
          traits: [
            ...commonTraits,
            ...formTraits,
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
            {
              type: 'text',
              label: 'Value',
              name: 'value',
              changeProp: 1,
            },
            {
              type: 'checkbox',
              label: 'Multiple',
              name: 'multiple',
              changeProp: 1,
            },
          ],
        },
        init() {
          this.listenTo(this, 'change:apiUrl', this.fetchData);
          this.listenTo(this, 'change:columnName', this.fetchData);
          this.listenTo(this, 'change:value', this.fetchData);
          this.listenTo(this, 'change:multiple', this.updateMultiple);
          this.listenTo(this, 'change:key', this.validateKey);
          this.listenTo(this, 'change:name', this.validateName);
          this.fetchData();
        },
        validateKey() {
          validateKey(this);
        },
        validateName() {
          validateName(this);
        },
        fetchData() {
          const apiUrl = this.get('apiUrl');
          const columnName = this.get('columnName');
          const value = this.get('value');
          const selectEl = this.view?.el;
          const option = document.createElement('option');
          option.textContent = "--Select--";
          if (apiUrl && columnName && selectEl) {
            fetch(apiUrl)
              .then(response => response.json())
              .then(data => {
                selectEl.innerHTML = '';
                selectEl.appendChild(option);
                data.forEach(item => {
                  const option = document.createElement('option');
                  option.value = (value) ? item[value] : item[columnName];
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
        updateMultiple() {
          const multiple = this.get('multiple');
          const selectEl = this.view?.el;
          if (selectEl) {
            if (multiple) {
              selectEl.setAttribute('multiple', 'multiple');
            } else {
              selectEl.removeAttribute('multiple');
            }
          }
        },
      },
      view: {
        onRender() {
          this.model.fetchData();
        },
      },
    });

    editor.DomComponents.addType('custom-container', {
      model: {
        defaults: {
          tagName: 'div',
          droppable: true,
          draggable: true,
          attributes: { class: 'container mx-auto p-4 h-full' },
          traits: [
            ...commonTraits,
            {
              type: 'text',
              label: 'Container ID',
              name: 'id',
            },
          ],
        },
        init() {
          this.listenTo(this, 'change:key', this.validateKey);
        },
        validateKey() {
          validateKey(this);
        },
      },
    });

    editor.DomComponents.addType('custom-textarea', {
      model: {
        defaults: {
          tagName: 'textarea',
          droppable: false,
          draggable: true,
          attributes: { class: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' },
          traits: [
            ...commonTraits,
            ...formTraits,
            {
              type: 'text',
              label: 'Placeholder',
              name: 'placeholder',
              changeProp: 1,
            },
            {
              type: 'number',
              label: 'Rows',
              name: 'rows',
              changeProp: 1,
            },
            {
              type: 'number',
              label: 'Cols',
              name: 'cols',
              changeProp: 1,
            },
          ],
        },
        init() {
          this.listenTo(this, 'change:key', this.validateKey);
          this.listenTo(this, 'change:name', this.validateName);
        },
        validateKey() {
          validateKey(this);
        },
        validateName() {
          validateName(this);
        },
      },
    });

    editor.DomComponents.addType('custom-checkbox', {
      model: {
        defaults: {
          tagName: 'div',
          droppable: false,
          draggable: true,
          attributes: { class: 'flex items-center' },
          components: `
            <input type="checkbox" class="mr-2 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded">
            <span class="checkbox-text">Default Text</span>
          `,
          traits: [
            ...commonTraits,
            ...formTraits,
            {
              type: 'text',
              label: 'Value',
              name: 'value',
              changeProp: 1,
            },
            {
              type: 'checkbox',
              label: 'Checked',
              name: 'checked',
              changeProp: 1,
            },
            {
              type: 'text',
              label: 'Text',
              name: 'text',
              changeProp: 1,
            },
          ],
        },
        init() {
          this.listenTo(this, 'change:text', this.updateText);
          this.listenTo(this, 'change:checked', this.updateChecked);
          this.listenTo(this, 'change:key', this.validateKey);
          this.listenTo(this, 'change:name', this.updateName);
          this.listenTo(this, 'change:name', this.validateName);
        },
        validateKey() {
          validateKey(this);
        },
        validateName() {
          validateName(this);
        },
        updateText() {
          const text = this.get('text');
          const textEl = this.view?.el.querySelector('.checkbox-text');
          if (textEl) {
            textEl.textContent = text;
          }
        },
        updateChecked() {
          const checked = this.get('checked');
          const inputEl = this.view?.el.querySelector('input[type="checkbox"]');
          if (inputEl) {
            inputEl.checked = checked;
          }
        },
        updateName() {
          const name = this.get('name');
          this.components().each(component => {
            const inputEl = component.view?.el.querySelector('input[type="checkbox"]');
            if (inputEl) {
              inputEl.setAttribute('name', name);
            }
          });
        },
      },
    });

    editor.DomComponents.addType('custom-radio', {
      model: {
        defaults: {
          tagName: 'div',
          droppable: false,
          draggable: true,
          attributes: { class: 'flex items-center' },
          components: `
            <input type="radio" class="mr-2 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded-full">
            <span class="radio-text">Default Text</span>
          `,
          traits: [
            ...commonTraits,
            ...formTraits,
            {
              type: 'text',
              label: 'Value',
              name: 'value',
              changeProp: 1,
            },
            {
              type: 'checkbox',
              label: 'Checked',
              name: 'checked',
              changeProp: 1,
            },
            {
              type: 'text',
              label: 'Text',
              name: 'text',
              changeProp: 1,
            },
          ],
        },
        init() {
          this.listenTo(this, 'change:text', this.updateText);
          this.listenTo(this, 'change:checked', this.updateChecked);
          this.listenTo(this, 'change:key', this.validateKey);
          this.listenTo(this, 'change:name', this.updateName);
          this.listenTo(this, 'change:name', this.validateName);
        },
        validateKey() {
          validateKey(this);
        },
        validateName() {
          validateName(this);
        },
        updateText() {
          const text = this.get('text');
          const textEl = this.view?.el.querySelector('.radio-text');
          if (textEl) {
            textEl.textContent = text;
          }
        },
        updateChecked() {
          const checked = this.get('checked');
          const inputEl = this.view?.el.querySelector('input[type="radio"]');
          if (inputEl) {
            inputEl.checked = checked;
          }
        },
        updateNameFromParent() {
          const parent = this.parent();
          if (parent && parent.get('type') === 'custom-radio-group') {
            const name = parent.get('name');
            const textEl = this.view?.el.querySelector('input[type="radio"]');
            if (textEl) {
              textEl.setAttribute('name', name);
            }
          }
        },
        updateName() {
          const name = this.get('name');
          this.components().each(component => {
            const inputEl = component.view?.el.querySelector('input[type="radio"]');
            if (inputEl) {
              inputEl.setAttribute('name', name);
            }
          });
        },
      },
      view: {
        onRender() {
          this.model.updateNameFromParent();
        },
      },
    });

    editor.DomComponents.addType('custom-radio-group', {
      model: {
        defaults: {
          tagName: 'div',
          droppable: true,
          draggable: true,
          attributes: { class: 'radio-group p-4' },
          traits: [
            ...commonTraits,
            ...formTraits,
          ],
        },
        init() {
          this.listenTo(this, 'change:name', this.updateName);
          this.listenTo(this, 'change:key', this.validateKey);
          this.listenTo(this, 'change:name', this.validateName);
        },
        validateKey() {
          validateKey(this);
        },
        validateName() {
          validateName(this);
        },
        updateName() {
          const name = this.get('name');
          this.components().each(component => {
            const inputEl = component.view?.el.querySelector('input[type="radio"]');
            if (inputEl) {
              inputEl.setAttribute('name', name);
            }
          });
        },
      },
    });

    const blocks = [
      {
        label: 'Columns',
        content: { type: 'custom-columns' },
        category: 'Layout',
      },
      {
        label: 'Input Field',
        content: { type: 'input' },
        category: 'Form',
      },
      {
        label: 'Label',
        content: { type: 'custom-label' },
        category: 'Form',
      },
      {
        label: 'Select Item',
        content: { type: 'custom-select' },
        category: 'Form',
      },
      {
        label: 'Container',
        content: { type: 'custom-container' },
        category: 'Layout',
      },
      {
        label: 'Textarea',
        content: { type: 'custom-textarea' },
        category: 'Form',
      },
      {
        label: 'Checkbox',
        content: { type: 'custom-checkbox' },
        category: 'Form',
      },
      {
        label: 'Radio Group',
        content: { type: 'custom-radio-group' },
        category: 'Form',
      },
      {
        label: 'Radio Button',
        content: { type: 'custom-radio' },
        category: 'Form',
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

function isKeyUnique(key) {
  return !allKeys.has(key);
}

function validateKey(element) {
  const newKey = element.get('key');
  const oldKey = element.previous('key');

  if (oldKey) {
    allKeys.delete(oldKey);
  }
  if (newKey) {
    if (!isKeyUnique(newKey)) {
      alert('Key must be unique. Please enter a different key.');
      element.set('key', null);
    } else {
      allKeys.add(newKey);
    }
  }
}

function validateName(element) {
  const newKey = element.get('name');
  const oldKey = element.previous('name');

  if (oldKey) {
    allNames.delete(oldKey);
  }
  if (newKey) {
    if (!isKeyUnique(newKey)) {
      alert('Name must be unique. Please enter a different Name.');
      element.set('name', null);
    } else {
      allNames.add(newKey);
    }
  }
}