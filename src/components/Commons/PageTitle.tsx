import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'

import ConversionRate from 'components/ConversionRate'

const PageTitleContent = ({ title, subTitle }: {
  title: string
  subTitle?: string
}) => {
  return (
    <Box
      display='flex'
      gap={2}
      alignItems='baseline'
    >
      <Typography
        variant='h2'
        sx={{ marginY: 1 }}
      >
        {title}
      </Typography>
      {subTitle && (
        <Typography
          variant='h6'
          sx={{ color: 'var(--color-text-dark)' }}
        >
          {subTitle}
        </Typography>
      )}
    </Box>
  )
}

const PageTitle = ({
  title,
  subTitle,
  haveRate,
}: {
  title: string
  subTitle?: string
  haveRate?: boolean
}) => {
  if (haveRate) {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <PageTitleContent title={title} subTitle={subTitle} />
        <ConversionRate />
      </Box>
    )
  }
  return (
    <PageTitleContent title={title} subTitle={subTitle} />
  )

}

export default PageTitle
