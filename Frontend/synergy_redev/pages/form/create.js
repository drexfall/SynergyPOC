import Head from 'next/head';
import { useState } from 'react';
import Input from "../../components/FormIO/input";
import Textarea from "../../components/FormIO/textarea";
import DateTimeInput from "../../components/FormIO/datetime";
import RadioGroup from "../../components/FormIO/radio";

export default function Editor() {
    const [components, setComponents] = useState([]);
    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const response = await fetch('/dotnet/account/SmartLockerLogin', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json()
        console.log(data);
    }


    async function getJson(templateId) {
        try {
            const response = await fetch('/dotnet/cms/template/GetTemplateJson?templateId=' + templateId, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
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
                    <div key={component.key} className="mb-4">
                        <Input
                            label={
                                <>
                                    {component.label}
                                    {component.validate?.required && <span className="text-red-500"> *</span>}
                                </>
                            }
                            type="text"
                            labelPosition={component.labelPosition?.split('-')[0]}
                            placeholder={component.placeholder}
                            required={component.validate?.required}
                            name={component.key}
                            id={component.key}
                        />
                    </div>
                );
            case 'number':
                return (
                    <div key={component.key} className="mb-4">
                        <Input
                            label={
                                <>
                                    {component.label}
                                    {component.validate?.required && <span className="text-red-500"> *</span>}
                                </>
                            }
                            type="number"
                            labelPosition={component.labelPosition?.split('-')[0]}
                            required={component.validate?.required}
                            placeholder={component.placeholder}
                            name={component.key}
                            id={component.key}
                        />
                    </div>
                );
            case 'password':
                return (
                    <div key={component.key} className="mb-4">
                        <Input
                            label= {
                                <>
                                    {component.label}
                                    {component.validate?.required && <span className="text-red-500"> *</span>}
                                </>
                            }
                            type="password"
                            labelPosition={component.labelPosition?.split('-')[0]}
                            placeholder={component.placeholder}
                            required={component.validate?.required}
                            name={component.key}
                            id={component.key}
                        />
                    </div>
                );

            case 'radio':
                return (
                    <div key={component.key} className="mb-4">
                        <RadioGroup
                            label={component.label}
                            options={component.values}
                            name={component.key}
                            required={component.validate?.required}
                        />
                    </div>
                );

            case 'checkbox':
                return (
                    <div key={component.key} className="mb-4">
                        <div className="flex items-center">
                            <Input
                                label={
                                    <>
                                        {component.label}
                                        {component.validate?.required && <span className="text-red-500"> *</span>}
                                    </>
                                }
                                labelPosition={'right'}
                                type="checkbox"
                                id={component.key}
                                name={component.key}
                                defaultChecked={component.defaultValue}
                                required={component.validate?.required}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"


                            />
                        </div>
                    </div>
                );
            case 'textarea':
                return (
                    <div key={component.key} className="mb-4">
                        <Textarea
                            label={
                                <>
                                    {component.label}
                                    {component.validate?.required && <span className="text-red-500"> *</span>}
                                </>
                            }
                            labelPosition={component.labelPosition?.split('-')[0]}
                            required={component.validate?.required}
                            placeholder={component.placeholder}
                            name={component.key}
                            id={component.key}
                        />
                    </div>
                );
            case 'datetime':
                const disableDates = [];
                if (component.datePicker?.disableWeekends) {
                    disableDates.push((date) => date.getDay() === 0 || date.getDay() === 6);
                }
                if (component.datePicker?.disableWeekdays) {
                    disableDates.push((date) => date.getDay() !== 0 && date.getDay() !== 6);
                }
                return (
                    <div key={component.key} className="mb-4">
                        <DateTimeInput
                            label={
                                <>
                                    {component.label}
                                    {component.validate?.required && <span className="text-red-500"> *</span>}
                                </>
                            }
                            labelPosition={component.labelPosition?.split('-')[0]}
                            required={component.validate?.required}
                            name={component.key}
                            id={component.key}
                            options={{
                                enableTime: component.widget?.enableTime,
                                minDate: component.widget?.minDate,
                                maxDate: component.widget?.maxDate,
                                disable: disableDates,
                            }}
                        />
                    </div>
                );

            case 'button':
                return (
                    <div key={component.key} className="mb-4">
                        <button
                            type="submit"
                            className="flex justify-center py-2 px-4 border border-transparent rounded-md
                            shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-7"
                            id={component.key}
                        >
                            {component.label}
                        </button>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <>
            <Head>
                <title>Create</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="m-5">
                    <button
                        type="button"
                        className="flex justify-center py-2 px-4 border border-transparent rounded-md
                        shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-7"
                        onClick={() => getJson('7e4cb000-2a1b-4a4b-ae94-1f0e205ea79a')}
                    > Get Form from JSON </button>
                    <form onSubmit={onSubmit}>
                        {Array.isArray(components) && components.length > 0 ? (
                            <>
                                {components.map(component => renderComponent(component))}
                                {/*<button*/}
                                {/*    type="submit"*/}
                                {/*    className="flex justify-center py-2 px-4 border border-transparent rounded-md*/}
                                {/*    shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none*/}
                                {/*    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-7"*/}
                                {/*    onClick={() => getJson('7e4cb000-2a1b-4a4b-ae94-1f0e205ea79a')}*/}
                                {/*> Submit </button>*/}
                            </>

                        ) : (
                            <p className={'text-gray-950 dark:text-gray-400'}>No components to display</p>
                        )}

                    </form>
                </div>
            </main>
        </>
);
}
