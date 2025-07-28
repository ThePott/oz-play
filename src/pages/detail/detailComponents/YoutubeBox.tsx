import { Box } from "@mui/material"

const YoutubeBox = ({ youtubeKey }: { youtubeKey: string }) => {
    return (
        <Box className="w-full bg-amber-300">
            <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${youtubeKey}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </Box>
    )
}

export default YoutubeBox