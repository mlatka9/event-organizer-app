import { useForm } from "react-hook-form";
import { GroupVisibility } from "@prisma/client";
import FormInput from "@components/form/form-input";
import FormTextarea from "@components/form/form-textarea";
import FormSelect from "@components/form/form-select";
import Button from "@components/common/button";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Heading from "@components/common/heading";
import { useCreateGroupMutation } from "hooks/mutation";
import MainLayout from "@components/layouts/main-layout";
import SectionWrapper from "@components/common/section-wrapper";

interface CreateGroupFormType {
  name: string;
  description: string;
  localization: string;
  visibility: GroupVisibility;
}

const groupVisibilityOptions = [
  { value: "", label: "select", disabled: true },
  { value: GroupVisibility.PRIVATE, label: "private", disabled: false },
  { value: GroupVisibility.PUBLIC, label: "public", disabled: false },
];

const CreateGroupPage = () => {
  // const createGroup = useCreateGroupMutation();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGroupFormType>({
    defaultValues: {},
  });

  const resetForm = () => {
    reset();
  };

  const createGroup = useCreateGroupMutation(resetForm);

  const onSubmit = (data: CreateGroupFormType) => {
    createGroup({
      name: data.name,
      description: data.description,
      groupVisibility: data.visibility,
      // localization: "",
    });
    // console.log(data);
  };

  return (
    <MainLayout>
      <SectionWrapper>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-4">
          <Heading>Create group</Heading>
          <FormInput
            label="name"
            register={register}
            name="name"
            rules={{
              required: {
                value: true,
                message: "name is required",
              },
            }}
            error={errors.name}
          />
          <FormTextarea
            label="description"
            register={register}
            name="description"
          />
          <FormInput
            label="localization"
            register={register}
            name="localization"
          />
          <FormSelect
            label="visibility"
            register={register}
            name="visibility"
            options={groupVisibilityOptions}
            rules={{
              required: {
                value: true,
                message: "visibility is required",
              },
            }}
            error={errors.visibility}
          />
          <Button type="submit">Submit</Button>
        </form>
      </SectionWrapper>
    </MainLayout>
  );
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
        permanent: false,
      },
    };
  }

  console.log(session);

  return {
    props: { session },
  };
}

export default CreateGroupPage;
