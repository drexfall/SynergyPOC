import Layout from "../../../components/layout/homeLayout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Loader from "../../../components/custom/Loader";
import Button from "../../../components/custom/Button";
import { faAdd, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Table from "../../../components/custom/Table";
import Link from "next/link";
import { Select } from "../../../components/FormIO/Select";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState(null);
  const [tableData, setTableData] = useState(null);
  const { templateId, templateName } = router.query;
  useEffect(() => {
    if (!templateId) {
      return;
    }
    axios
      .get(`/forms/GetFormTemplates?id=${templateId}`)
      .then((response) => {
        setTemplate(response.data);
        axios
          .get(`/forms/GetFormIndexColumn?templateCode=${response.data.Code}`)
          .then((response) => {
            setTableData(response.data);
            setLoading(false);
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);
  return (
    <Layout>
      <Head>
        <title>Form Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"p-4 mx-2 mt-2 flex flex-col gap-4"}>
        {template ? (
          <>
            <div className={"flex w-full justify-between"}>
              <h2 className={"text-2xl font-semibold text-primary-300"}>
                {template.DisplayName}
              </h2>

              <Button
                icon={faAdd}
                onClick={() => {
                  router.push(
                    {
                      pathname: `/form/${templateName}/manage`,
                      query: {
                        templateId: templateId,
                      },
                    },
                    `/form/${templateName}/manage`,
                  );
                }}
              ></Button>
            </div>
            {template.Description ? (
              <>
                <p className={"text-primary-200"}>{template.Description}</p>
                <hr className={"border-primary-950"} />
              </>
            ) : null}
            {loading ? (
              <div className={"w-full p-4 flex items-center justify-center"}>
                <Loader></Loader>
              </div>
            ) : tableData ? (
              <Table
                rowId="Id"
                rowName="DisplayName"
                data={tableData.TableRowData}
                columns={tableData.SelectedTableRows.map((row) => {
                  return {
                    header: row.ColumnHeaderName,
                    field: row.ColumnHeaderName,
                  };
                })}
                actions={[
                  {
                    label: "Edit",
                    icon: faPencil,
                    onClick: (event) => {
                      router.push(
                        {
                          pathname: `/form/manage`,
                          query: {
                            recordId: event.active,
                            templateId: router.query.templateId,
                          },
                        },
                        "/form/manage",
                      );
                    },
                  },
                  {
                    label: "Delete",
                    icon: faTrash,
                    onClick: (event) => {
                      axios.get("");
                    },
                  },
                ]}
              ></Table>
            ) : (
              <p>Cannot fetch table data</p>
            )}
          </>
        ) : (
          <div>
            <Loader></Loader>
          </div>
        )}
        )
      </main>
    </Layout>
  );
}
