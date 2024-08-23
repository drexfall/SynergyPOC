import Head from 'next/head';
import {useState, useEffect, useRef} from 'react';
import Input from "../../components/FormIO/input";
import Textarea from "../../components/FormIO/textarea";
import DateTimeInput from "../../components/FormIO/datetime";
import RadioGroup from "../../components/FormIO/radio";
import Layout from "../../components/layout/homeLayout";
import {InputField, TextArea} from "../../components/FormIO/form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/custom/Loader";

export default function Editor() {
    const [components, setComponents] = useState([]);
    const [templateCode, setTemplateCode] = useState([])
    const templateInput = useRef();
    useEffect(() => {
        setComponents([])
        getJson();
    }, [templateCode]);

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


    async function getJson() {
        try {
            const response = await fetch('/forms/GetTemplateJson?templateCode=' + templateCode, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            if (Array.isArray(data.components)) {
                setComponents(data.components);
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
                        <InputField
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
                        <InputField
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
                        <InputField
                            label={
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
                        <TextArea
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
        <Layout>
            <Head>
                <title>Create</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <h2 className={"text-2xl font-semibold p-4 mt-2"}>Template Editor</h2>
                <div className="p-4 flex flex-col gap-4">
                    <div className={"flex gap-4"}>
                        <InputField inputRef={templateInput} id={"template-code"} name={"Template Code"}></InputField>
                        <button
                            type="button"
                            className={"primary"}
                            onClick={() => {
                                setTemplateCode(templateInput.current.value)
                            }}
                        ><FontAwesomeIcon className={"w-4"} icon={faRefresh}/>
                        </button>
                    </div>
                    <hr className={"m-2 me-0"}/>
                    {templateCode ?
                        Array.isArray(components) && components.length > 0 ? (
                            <>
                                <form onSubmit={onSubmit} className={"flex flex-col gap-4"}>
                                    {components.map(component => renderComponent(component))}
                                    <hr className={"my-2"}/>
                                    <div className={"inline-flex gap-4 ms-auto"}>
                                        <button type={"reset"} className={"secondary"}>Reset</button>
                                        <button type={"submit"} className={"primary"}>Save</button>
                                    </div>
                                </form>
                            </>

                        ) : (
                            <div>
                                <Loader/>
                            </div>
                        )
                        : <p>Please enter a template code</p>
                    }

                </div>
            </main>
        </Layout>
    );
}
