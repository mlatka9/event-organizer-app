import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useGroupInfoQuery } from "@hooks/query";

const GroupPage = () => {
  const router = useRouter();
  const groupId = router.query.id as string;

  const { isSuccess, data } = useGroupInfoQuery(groupId);

  if (!isSuccess) return <div>loading</div>;

  console.log("data", data);

  return <div>
    <div>{data.name}</div>
    <div>{data.description}</div>
  </div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false
      }
    };
  }
  return {
    props: { session }
  };
}

export default GroupPage;
