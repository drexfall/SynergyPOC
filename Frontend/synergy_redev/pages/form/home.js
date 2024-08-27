import Layout from "../../components/layout/homeLayout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Loader from "../../components/custom/Loader";
import Button from "../../components/custom/Button";
import { faAdd, faPencil } from "@fortawesome/free-solid-svg-icons";
import Table from "../../components/custom/Table";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [template, setTemplate] = useState(null);
  useEffect(() => {
    let templateId = router.query.templateId;
    if (!templateId) {
      return;
    }
    axios.get(`/forms/GetFormTemplates?id=${templateId}`).then((response) => {
      setTemplate(response.data);
    });
  }, [router.query.templateId]);
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
              <h2 className={"text-2xl font-semibold text-primary-900 dark:text-primary-300"}>
                {template.DisplayName}
              </h2>
              <Button
                icon={faAdd}
                onClick={() => {
                  router.push(
                    {
                      pathname: `/form/manage`,
                      query: {
                        templateId: router.query.templateId,
                      },
                    },
                    "/form/manage",
                  );
                }}
              ></Button>
            </div>
            {template.Description ? (
              <>
                <p className={"text-primary-900 dark:text-primary-200"}>{template.Description}</p>
                <hr />
              </>
            ) : null}
            <Table
              rowId="id"
              data={{ source: "https://jsonplaceholder.typicode.com/comments" }}
              columns={[
                {
                  header: "Name",
                  field: "name",
                },
                {
                  header: "Email",
                  field: "email",
                },
                {
                  header: "Post Id",
                  field: "postId",
                },
              ]}
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
              ]}
            ></Table>
          </>
        ) : (
          <Loader></Loader>
        )}
      </main>
    </Layout>
  );
}
