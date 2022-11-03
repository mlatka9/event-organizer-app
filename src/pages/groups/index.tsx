import Heading from "@components/common/heading";
import GroupCard from "@components/groups/group-card";
import MainLayout from "@components/layouts/main-layout";
import { useGroups } from "hooks/query";
import Link from "next/link";

const GroupsPage = () => {
  const { data, status } = useGroups();

  if (status !== "success") {
    return <div>Loading...</div>;
  }

  console.log("groups", data);

  return (
    <MainLayout>
      <div className="mx-auto  max-w-[1000px]">
        <div className="mb-5 flex items-center justify-between">
          <Heading>Groups</Heading>
          <Link href="/groups/create">
            <a className="text-blue-500 hover:underline">CREATE GROUP</a>
          </Link>
        </div>
        <div className="space-y-3">
          {data.map((group) => (
            <Link href={`/groups/${group.id}`} key={group.id} passHref>
              <a className="block">
                <GroupCard
                  name={group.name}
                  description={group.description}
                  localization={"Kraków"}
                  visibility={group.groupVisibility}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default GroupsPage;
