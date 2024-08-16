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

    editor.DomComponents.addType('columns', {
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
                  type: 'container',
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

    editor.DomComponents.addType('label', {
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

    editor.DomComponents.addType('select', {
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

    editor.DomComponents.addType('container', {
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

    editor.DomComponents.addType('textarea', {
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

    editor.DomComponents.addType('checkbox', {
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
          const inputEl = this.view?.el.querySelector('input[type="checkbox"]');
          if (inputEl) {
            inputEl.setAttribute('name', name);
          }
        },
      },
    });

    editor.DomComponents.addType('radio', {
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
          const inputEl = this.view?.el.querySelector('input[type="radio"]');
          if (inputEl) {
            inputEl.setAttribute('name', name);
          }
        },
      },
      view: {
        onRender() {
          this.model.updateNameFromParent();
        },
      },
    });

    editor.DomComponents.addType('radio-group', {
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
    
    editor.DomComponents.addType('heading', {
      model: {
        defaults: {
          tagName: 'h1',
          droppable: false,
          draggable: true,
          attributes: { class: 'text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl' }, // Default class for h1
          content: 'Heading Text',
          traits: [
            ...commonTraits,
            {
              type: 'select',
              label: 'Tag',
              name: 'tagName',
              options: [
                { value: 'h1', name: 'H1' },
                { value: 'h2', name: 'H2' },
                { value: 'h3', name: 'H3' },
                { value: 'h4', name: 'H4' },
                { value: 'h5', name: 'H5' },
                { value: 'h6', name: 'H6' },
              ],
              changeProp: 1,
            },
            {
              type: 'text',
              label: 'Text',
              name: 'content',
              changeProp: 1,
            },
          ],
        },
        init() {
          this.listenTo(this, 'change:content', this.updateContent);
          this.listenTo(this, 'change:tagName', this.updateTagName);
          this.listenTo(this, 'change:key', this.validateKey);
        },
        validateKey() {
          validateKey(this);
        },
        updateContent() {
          const content = this.get('content');
          const tagName = this.get('tagName');
          const el = this.view?.el.querySelector(tagName);
    
          if (el) {
            el.innerHTML = content;
          }
        },
        updateTagName() {
          const tagName = this.get('tagName');
          const newClass = this.getHeadingClass(tagName);
          
          this.set({ tagName });
          
          this.addAttributes({ class: newClass });
          
          this.view.render();
        },
        getHeadingClass(tagName) {
          switch (tagName) {
            case 'h1':
              return 'text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl';
            case 'h2':
              return 'text-3xl font-extrabold font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl';
            case 'h3':
              return 'text-2xl font-extrabold font-semibold leading-tight text-gray-900 md:text-3xl lg:text-4xl';
            case 'h4':
              return 'text-xl font-extrabold font-medium leading-tight text-gray-900 md:text-2xl lg:text-3xl';
            case 'h5':
              return 'text-lg font-extrabold font-normal leading-tight text-gray-900 md:text-xl lg:text-2xl';
            case 'h6':
              return 'text-base font-extrabold font-light leading-tight text-gray-900 md:text-lg lg:text-xl';
          }
        },
      },
      view: {
        onRender() {
          this.model.updateContent();
        },
      },
    });
    
    editor.DomComponents.addType('paragraph', {
      model: {
        defaults: {
          tagName: 'p',
          droppable: false,
          draggable: true,
          attributes: { 
            class: 'text-base leading-normal text-gray-900',
            contenteditable: 'true'
          },
          content: 'Paragraph text...', 
          traits: [
            ...commonTraits,
            {
              type: 'textarea', 
              label: 'Content',
              name: 'content',
              changeProp: 1, 
            },
          ],
        },
        init() {
          this.listenTo(this, 'change:content', this.updateContent); 
          this.listenTo(this, 'change:content', this.updateViewContent); 
          this.listenTo(this, 'change:key', this.validateKey); 
        },
        validateKey() {
          validateKey(this);
        },
        updateContent() {
          const content = this.get('content'); 
          const el = this.view?.el.querySelector('p'); 
    
          if (el) {
            el.innerHTML = content; 
          }
        },
        updateViewContent() {
          const el = this.view?.el;
          if (el) {
            el.innerHTML = this.get('content');
          }
        },
      },
      view: {
        onRender() {
          this.model.updateContent();
          this.el.addEventListener('blur', () => {
            this.model.set('content', this.el.innerHTML);
          }, true);
        },
      },
    });
    
    editor.DomComponents.addType('file-upload', {
      model: {
        defaults: {
          tagName: 'div',
          attributes: { class: 'mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10' },
          droppable: false,
          draggable: true,
          selectable: true,
          components: [
            {
              tagName: 'div',
              attributes: { class: 'text-center' },
              selectable: false, 
              components: [
                {
                  tagName: 'div',
                  attributes: { class: 'mx-auto h-12 w-12 text-gray-300' },
                  content: `
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd"/>
                    </svg>
                  `,
                  selectable: false
                },
                {
                  tagName: 'div',
                  attributes: { class: 'mt-4 flex text-sm leading-6 text-gray-600' },
                  selectable: false, 
                  components: [
                    {
                      tagName: 'label',
                      attributes: {
                        for: 'file-upload',
                        class: 'relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500',
                      },
                      selectable: false,
                      components: [
                        {
                          tagName: 'span',
                          content: 'Upload a file',
                          selectable: false
                        },
                        {
                          tagName: 'input',
                          attributes: {
                            type: 'file',
                            class: 'sr-only'
                          },
                          selectable: false,
                          editable: false
                        }
                      ]
                    },
                    {
                      tagName: 'p',
                      content: 'or drag and drop',
                      attributes: { class: 'pl-1' },
                      selectable: false
                    }
                  ]
                },
                {
                  tagName: 'p',
                  content: 'PNG, JPG, GIF up to 10MB',
                  attributes: { class: 'text-xs leading-5 text-gray-600' },
                  selectable: false
                }
              ]
            }
          ],
          traits: [
            ...commonTraits,
            ...formTraits,
            {
              type: 'text',
              label: 'File types',
              name: 'file-types',
              changeProp: 1,
            },
            {
              type: 'text',
              label: 'Max file size',
              name: 'max-size',
              changeProp: 1,
            },
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
          const inputEl = this.view?.el.querySelector('input');
          if (inputEl) {
            inputEl.setAttribute('name', name);
          }
        },
      },
    });    
    

    const blocks = [
      {
        label: 'Columns',
        content: { type: 'columns' },
        category: 'Layout',
      },
      {
        label: 'Input',
        content: { type: 'input' },
        category: 'Form',
      },
      {
        label: 'Label',
        content: { type: 'label' },
        category: 'Form',
      },
      {
        label: 'Select',
        content: { type: 'select' },
        category: 'Form',
      },
      {
        label: 'Container',
        content: { type: 'container' },
        category: 'Layout',
      },
      {
        label: 'Textarea',
        content: { type: 'textarea' },
        category: 'Form',
      },
      {
        label: 'Checkbox',
        content: { type: 'checkbox' },
        category: 'Form',
      },
      {
        label: 'Radio Group',
        content: { type: 'radio-group' },
        category: 'Form',
      },
      {
        label: 'Radio Button',
        content: { type: 'radio' },
        category: 'Form',
      },
      {
        label: 'Heading',
        content: { type: 'heading' },
        category: 'Text',
      },
      {
        label: 'Paragraph',
        content: { type: 'paragraph' },
        category: 'Text',
      },
      {
        label: 'File Upload',
        category: 'Form',
        content: { type: 'file-upload' },
      }
    ]

    blocks.forEach(block => {
      editor.BlockManager.add(block.id, block);
    });
    
    window.editor = editor;
    
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

function isNameUnique(key) {
  return !allNames.has(key);
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
  debugger;
  const newKey = element.get('name');
  const oldKey = element.previous('name');

  if (oldKey) {
    allNames.delete(oldKey);
  }
  if (newKey) {
    if (!isNameUnique(newKey)) {
      alert('Name must be unique. Please enter a different Name.');
      element.set('name', null);
    } else {
      allNames.add(newKey);
    }
  }
}