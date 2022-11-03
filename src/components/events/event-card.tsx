import { GroupVisibility } from "@prisma/client";

interface GroupCardProps {
  name: string;
  description: string | null;
  address: string;
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
}

const EventCard = ({
  name,
  description,
  address,
  onMouseEnter,
  onMouseLeave,
}: GroupCardProps) => {
  return (
    <div
      className="rounded-lg bg-white p-5 shadow-lg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p className=" text-lg font-bold">{name}</p>
      <p className="mb-5 text-sm text-gray-500">{address}</p>
      {description && <p>{description}</p>}
      <div className="flex justify-between text-gray-500">
        <span>{0} memebers</span>
      </div>
    </div>
  );
};

export default EventCard;
