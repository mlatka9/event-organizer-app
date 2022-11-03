import { GroupVisibility, GroupRole } from "@prisma/client";

interface GroupCardProps {
  name: string;
  description: string | null;
  localization: string | null;
  visibility: GroupVisibility;
}

const GroupCard = ({
  name,
  localization,
  description,
  visibility,
}: GroupCardProps) => {
  return (
    <div className="rounded-lg bg-white p-5">
      <p className="mb-5 text-lg font-bold">{name}</p>
      {localization && <p>{localization}</p>}
      {description && <p>{description}</p>}
      <div className="flex justify-between text-gray-500">
        <span>{0} memebers</span>
        <span>{visibility.toLocaleLowerCase()}</span>
      </div>
    </div>
  );
};

export default GroupCard;
