import { Comment } from "../../../../../utils/api/Comments";

interface Props2 {
  comments: Comment[];
  show: boolean;
}

export const ModalComments = ({ comments, show }: Props2) => {
  return (
    <div
      className={`${show ? "flex flex-col gap-1 visible max-h-32 py-2 overflow-y-scroll align-bottom rounded-xl px-2 border-[1px] border-cream" : "invisible h-0"}`}
    >
      {comments.map((comment: Comment, index: number) => (
        <div
          key={comment.id}
          className="flex flex-row gap-2 justify-normal items-start"
        >
          <div className="flex-none font-medium text-xs">{comment.user}</div>
          <div className="text-xs">{comment.text}</div>
        </div>
      ))}
    </div>
  );
};
