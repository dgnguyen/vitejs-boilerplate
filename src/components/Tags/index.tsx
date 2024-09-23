import { Chip, Stack, Theme } from '@mui/material'

const Tags = ({ tags }: { tags: any[] }) => {
  return (
    <Stack
      alignItems='center'
      columnGap={0.5}
      direction='row'
      display='flex'
      justifyContent='flex-start'
      pt={1}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {tags.map((item) => {
        return (
          <Chip
            clickable
            key={item}
            label={item}
            onClick={() => {}}
            // onDelete={onRemove && handleRemove(id)}
            sx={[
              (th: Theme) => ({
                // bgcolor: bgColor,
                // color: th.palette.getContrastText(bgColor),
                // ':hover': {
                //   bgcolor: hoverColor,
                // },
              }),
            ]}
          />
        )
      })}
    </Stack>
  )
}

export default Tags
