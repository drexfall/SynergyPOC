import { Select } from "../../components/FormIO/Select";
import { useState } from "react";
import Head from "next/head";
import Layout from "../../components/layout/homeLayout";
import Table from "../../components/custom/Table";
import { Info } from "../../components/FormIO/Docs";
import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState();

  async function getTemplate(templateId) {
    try {
      setLoading(true);
      const response = await fetch("/forms/GetFormTemplates?id=" + templateId);

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

  return (
    <Layout>
      <Head>
        <title>Form Template Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"p-4 mx-2 mt-2 flex flex-col gap-4"}>
        <h2 className={"text-2xl font-semibold text-primary-900 dark:text-primary-300"}>
          Form Template Dashboard
        </h2>
        <p className={"text-primary-900 dark:text-primary-200"}>
          This page contains a brief overview of all form templates created in
          the Synergy platform.
        </p>
        <Info
          className={"mt-4"}
          heading={"Quick Tip"}
          text={
            "Try clicking on any row to select. Right click for performable actions"
          }
        ></Info>
        <div className={"mt-4"}>
          <Table
            rowId={"Id"}
            rowName={"DisplayName"}
            data={{
              source: "/forms/GetFormTemplates",
            }}
            columns={[
              {
                header: "Name",
                field: "Name",
              },
              {
                header: "Display Name",
                field: "DisplayName",
              },
              {
                header: "Code",
                field: "Code",
              },
              {
                header: "Created Date",
                field: "CreatedDate",
              },
            ]}
            actions={[
              {
                label: "View",
                icon: faEye,
                onClick: (active) => {
                  router.push(
                    {
                      pathname: `/form/${active.name}`,
                      query: {
                        templateId: active.id,
                      },
                    },
                    `/form/${active.name}`,
                  );
                },
              },
              {
                label: "Edit",
                icon: faPencil,
                onClick: (active) => {
                  router.push(`/template/manage/${active.id}`);
                },
              },
              {
                label: "Delete",
                icon: faTrash,
                onClick: (active) => {
                  console.log("Delete");
                },
              },
            ]}
          ></Table>
        </div>
      </main>
    </Layout>
  );
}
