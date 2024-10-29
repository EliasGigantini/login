import { Comment } from "../../../../../utils/api/Comments";

interface Props2 {
  comments: Comment[];
  show: boolean;
}

export const ModalComments = ({ comments, show }: Props2) => {
  return (
    <div
      className={`${show ? "flex flex-col visible max-h-32 overflow-y-scroll align-bottom" : "invisible h-0"}`}
    >
      {comments.map((comment: Comment) => (
        <div
          key={comment.id}
          className="flex flex-row gap-2 justify-normal items-start"
        >
          <div className="flex-none font-medium text-sm">{comment.user}</div>
          <div className="text-sm">{comment.text}</div>
        </div>
      ))}
    </div>
  );
};
