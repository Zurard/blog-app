import { Button } from '@/components/ui/button';

export default function Blog() {
    return (
       <div>
         <div>
            <Button>Subscribe</Button>
        </div>
        <div>
            <div className='text-6xl'>Blog.title</div>
            <div>Blog.description</div>
            <div>blog.author</div>
            <hr/>
            <div> blog.data</div>
        </div>
            <div className='flex px-4'>
                <Button>Like</Button>
                <Button>Comment</Button>
                <Button>Share</Button>
            </div>
       </div>
    )
}