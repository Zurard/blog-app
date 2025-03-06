import CommentList from "@/component/commentList";
import AddComment from "@/component/addComment";

interface CommentsProps {
    blogID: string;
}  

export default function Comments({blogID}: CommentsProps) {
    return(
        <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg">
        <AddComment blogID={blogID}  />
        <CommentList blogID={blogID}/>
        </div>
    )
}