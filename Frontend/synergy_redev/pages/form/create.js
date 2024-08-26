import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Input from "../../components/FormIO/input";
import DateTimeInput from "../../components/FormIO/datetime";
import RadioGroup from "../../components/FormIO/radio";
import Layout from "../../components/layout/homeLayout";
import { InputField } from "../../components/FormIO/form";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/custom/Loader";
import Button from "../../components/custom/Button";
import { Select } from "../../components/FormIO/Select";
import DataGridComponent from "../../components/FormIO/datagrid";

export default function Editor() {
  const [loading, setLoading] = useState(false);
  const [components, setComponents] = useState([]);
  const [template, setTemplate] = useState(null);
  const templateInput = useRef();
  useEffect(() => {
    if (template) {
      const data = JSON.parse(template["Json"]);
      if (Array.isArray(data.components)) {
        setComponents(data.components);
      } else {
        console.error("Expected an array of components");
      }
    }
  }, [template]);

  async function onSubmit(event) {
    event.preventDefault();
    console.log(event);
    let formData = new FormData(event.currentTarget);
    let jsonData = {};

    Array.from(formData.entries()).map(([key, value]) => {
      jsonData[key] = value;
    });
    console.log(formData, jsonData);
    const response = await fetch("/forms/ManageForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: "45bba746-3309-49b7-9c03-b5793369d73c",
        PortalId: template.PortalId,
        TemplateCode: template.Code,
        Json: JSON.stringify(jsonData),
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  async function getTemplate(templateCode) {
    try {
      setLoading(true);
      const response = await fetch("/forms/GetTemplates?code=" + templateCode);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setTemplate(result);
    } catch (error) {
      console.error("Failed to fetch JSON:", error);
    }
    setLoading(false);
  }

  function renderComponent(component) {
    switch (component.type) {
      case "textfield":
      case "number":
      case "password":
      case "textarea":
        return (
          <div key={component.key} className="mb-4">
            <InputField
              type={component.type}
              placeholder={component.placeholder}
              required={component.validate?.required}
              label={component.label}
              id={component.key}
            />
          </div>
        );
      case "radio":
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

      case "checkbox":
        return (
          <div key={component.key} className="mb-4">
            <div className="flex items-center">
              <Input
                label={
                  <>
                    {component.label}
                    {component.validate?.required && (
                      <span className="text-red-500"> *</span>
                    )}
                  </>
                }
                labelPosition={"right"}
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

      case 'datagrid':
        return <DataGridComponent key={component.key} component={component} renderComponent={renderComponent} />;

      case "datetime":
        const disableDates = [];
        if (component.datePicker?.disableWeekends) {
          disableDates.push(
            (date) => date.getDay() === 0 || date.getDay() === 6,
          );
        }
        if (component.datePicker?.disableWeekdays) {
          disableDates.push(
            (date) => date.getDay() !== 0 && date.getDay() !== 6,
          );
        }
        return (
          <div key={component.key} className="mb-4">
            <DateTimeInput
              label={
                <>
                  {component.label}
                  {component.validate?.required && (
                    <span className="text-red-500"> *</span>
                  )}
                </>
              }
              labelPosition={component.labelPosition?.split("-")[0]}
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

      case "button":
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className={"text-2xl font-semibold p-4 mt-2"}>Template Editor</h2>
        <div className="p-4 flex flex-col gap-4">
          <div className={"flex gap-4"}>
            <InputField
              inputRef={templateInput}
              id={"template-code"}
              label={"Template Code"}
              required={true}
              button={{
                icon: faRefresh,
                direction: "right",
                submit: getTemplate,
              }}
            ></InputField>
            <Select
              options={[
                {
                  label: "Hello",
                  value: "Hey",
                },
              ]}
            ></Select>
          </div>
          <hr />
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : template ? (
            <>
              <form onSubmit={onSubmit} className={"flex flex-col gap-4"}>
                {components.map((component) => renderComponent(component))}
                <hr />
                <div className={"inline-flex gap-4 ms-auto"}>
                  <Button
                    type={"reset"}
                    className={"secondary"}
                    text={"Reset"}
                  />
                  <Button type={"submit"} className={"primary"} text={"Save"} />
                </div>
              </form>
            </>
          ) : (
            <p>Please enter a template code</p>
          )}
        </div>
      </main>
    </Layout>
  );
}
