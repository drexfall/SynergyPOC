import Head from 'next/head';
import { useState } from 'react';
import Input from "../../components/FormIO/input";

export default function Editor() {
    const [components, setComponents] = useState([]);

    async function getJson(templateId) {
        try {
            const response = await fetch('/api/cms/template/GetTemplateJson?templateId=' + templateId, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            var res = JSON.parse(data);
            if (Array.isArray(res.components)) {
                setComponents(res.components);
            } else {
                console.error('Expected an array of components');
            }
        } catch (error) {
            console.error('Failed to fetch JSON:', error);
        }
    }

    function renderComponent(component) {
        switch (component.type) {
            case 'textfield':
                return (
                        <Input label={component.label}
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder={component.placeholder}
                            required={component.validate.required}
                        />
                );
            case 'number':
                return (
                    <div key={component.key} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">{component.label}</label>
                        <input
                            type="number"
                            placeholder={component.placeholder}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <>
            <Head>
                <title>Form Editor</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="m-5">
                    <button
                        type="submit"
                        className="flex justify-center py-2 px-4 border border-transparent rounded-md
                        shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-7"
                        onClick={() => getJson('7e4cb000-2a1b-4a4b-ae94-1f0e205ea79a')}
                    >
                        Get JSON
                    </button>
                    <form>
                        {Array.isArray(components) && components.length > 0 ? (
                            components.map(component => renderComponent(component))
                        ) : (
                            <p>No components to display</p>
                        )}
                    </form>
                </div>
            </main>
        </>
    );
}
