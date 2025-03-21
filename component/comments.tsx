import CommentList from "@/component/commentList";
import AddComment from "@/component/addComment";

interface CommentsProps {
    blogID: string;
}  

export default function Comments({blogID}: CommentsProps) {
    return(
        <div className="max-w-4xl mx-auto mt-16">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 md:p-8 shadow-xl">
          <AddComment blogID={blogID} />
          <CommentList blogID={blogID} Comment="Sample Comment" />
        </div>
      </div>
    )
}