import Button from "@components/common/button";
import Heading from "@components/common/heading";
import SectionWrapper from "@components/common/section-wrapper";
import FormInput from "@components/form/form-input";
import FormTagPicker from "@components/form/form-tag-picker";
import FormTextarea from "@components/form/form-textarea";
import MainLayout from "@components/layouts/main-layout";
import { useCreateEventMutation } from "@hooks/mutation";
import { getServerAuthSession } from "@server/lib/get-server-auth-session";
import axios from "axios";
import dayjs from "dayjs";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CreateEventFormType {
  name: string;
  description: string;
  city: string;
  country: string;
  postCode: string;
  startDate: string;
  street: string;
  tags: string[];
  // latitude: number;
  // longitude: number;
}

const currentDate = dayjs().format("YYYY-MM-DD");

const MapWithNoSSR = dynamic(() => import("@components/map"), {
  ssr: false,
});

const CreateEventPage = () => {
  const [locationCoords, setLocationCoords] = useState<
    | {
        lon: 0;
        lat: 0;
      }
    | undefined
  >(undefined);
  const [mapZoomLevel, setMapZoomLevel] = useState(1);

  const {
    reset,
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateEventFormType>({
    defaultValues: {
      tags: [],
    },
  });

  const resetForm = () => {
    reset();
  };

  const createEvent = useCreateEventMutation(resetForm);

  const onSubmit = async (data: CreateEventFormType) => {
    console.log(data);

    createEvent({
      name: data.name,
      description: data.description,
      city: data.city,
      country: data.country,
      postCode: data.postCode,
      startDate: new Date(data.startDate).toISOString(),
      street: data.street,
      tags: data.tags,
      latitude: locationCoords?.lat,
      longitude: locationCoords?.lon,
    });
  };

  // console.log("coords w state", locationCoords);

  const handleAddTag = (newTag: string) => {
    setValue("tags", [...getValues("tags"), newTag]);
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      "tags",
      getValues("tags").filter((t) => t !== tag)
    );
  };

  const selectedTags = watch("tags");

  const findGeologicalLocation = async () => {
    const addressValues = getValues(["street", "city", "postCode", "country"]);

    const query = addressValues.filter((value) => value).join(", ");
    const { data } = await axios.get("https://photon.komoot.io/api", {
      params: {
        q: query,
      },
    });

    const newMatchingLocation = data.features[0];

    if (!newMatchingLocation) {
      setLocationCoords(undefined);
      setMapZoomLevel(1);
      return;
    }
    const { coordinates } = newMatchingLocation.geometry;

    console.log("coords", coordinates);

    const { extent } = newMatchingLocation.properties;

    console.log(newMatchingLocation.properties);

    if (extent) {
      const locationDiameter = Math.sqrt(
        Math.abs(extent[2] - extent[0]) + Math.abs(extent[3] - extent[1])
      );

      if (locationDiameter < 4) {
        setMapZoomLevel(6);
      }
      if (locationDiameter < 2) {
        setMapZoomLevel(8);
      }
      if (locationDiameter < 1) {
        setMapZoomLevel(12);
      }
      if (locationDiameter < 0.5) {
        setMapZoomLevel(14);
      }
      if (locationDiameter < 0.1) {
        setMapZoomLevel(16);
      }
    }
    setLocationCoords({ lon: coordinates[0], lat: coordinates[1] });
  };

  const locationMarker = locationCoords
    ? [
        {
          latitude: locationCoords.lat,
          longitude: locationCoords.lon,
          id: "1",
        },
      ]
    : [];

  return (
    <MainLayout>
      <SectionWrapper>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-4">
          <Heading>Create event</Heading>
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
          <MapWithNoSSR markers={locationMarker} />
          <FormInput
            label="street"
            register={register}
            name="street"
            onBlur={findGeologicalLocation}
          />
          <FormInput
            label="city"
            register={register}
            name="city"
            onBlur={findGeologicalLocation}
          />
          <FormInput
            label="post code"
            register={register}
            name="postCode"
            onBlur={findGeologicalLocation}
          />
          <FormInput
            label="country"
            register={register}
            name="country"
            onBlur={findGeologicalLocation}
          />
          <input
            type="datetime-local"
            {...register("startDate")}
            min={currentDate}
          ></input>
          <FormTagPicker
            addTag={handleAddTag}
            removeTag={handleRemoveTag}
            selectedTags={selectedTags}
          />
          <Button type="submit">Submit</Button>
        </form>
      </SectionWrapper>
    </MainLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

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

export default CreateEventPage;
