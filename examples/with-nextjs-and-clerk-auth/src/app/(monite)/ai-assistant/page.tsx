'use client';

import { useState } from 'react';

import Image from 'next/image';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  createSvgIcon,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import aiStub from './ai-stub-793.png';

export default function AiAssistantPage() {
  const [replyShown, setReplyShown] = useState(false);

  const onCardClick = () => {
    // Do nothing on click - Alex told not to show fake response
    // setReplyShown(true);
  };

  return (
    <Box className="Monite-PageContainer Monite-AiAssistant">
      <Stack direction="column" sx={{ width: '100%', height: '100%' }}>
        <Typography variant="h2">AI Assistant</Typography>
        <Box sx={{ mt: 6 }}>
          <Alert
            severity="info"
            variant="filled"
            sx={{ bgcolor: '#6666FF', py: 2, px: 3, fontWeight: 500 }}
            icon={
              <AlertIcon sx={{ width: 40, height: 40, alignSelf: 'center' }} />
            }
          >
            <AlertTitle variant="subtitle1" sx={{ fontWeight: 600 }}>
              Available on production API
            </AlertTitle>
            AI Assistant functionality is available on our production API only
            for now. Contact our team to get more info!
          </Alert>
        </Box>
        <Stack sx={{ overflow: 'auto', height: '100%' }}>
          <Box flexGrow={2} sx={{ mt: 8 }}>
            {!replyShown && (
              <Stack
                direction="column"
                alignItems="center"
                gap={2}
                sx={{ width: '100%', height: '100%' }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ width: '100%', maxWidth: '720px' }}
                >
                  Some examples of what you can do:
                </Typography>
                <Stack
                  direction="row"
                  gap={2}
                  sx={{ maxWidth: '720px', mb: 4 }}
                >
                  <AiCard
                    Icon={Icon1}
                    title="Find documents quickly"
                    body="Type any prompt and we’ll look for all related documents and show you relevant information organised."
                    onClick={onCardClick}
                  />
                  <AiCard
                    Icon={Icon2}
                    title="Automate & schedule"
                    body="Schedule payments, emails and notifications. Create new
                        documents, approval policies or any other items."
                    onClick={onCardClick}
                  />
                  <AiCard
                    Icon={Icon3}
                    title="Generate custom reports"
                    body="Choose what information to combine is a custom-made
                        reports tailored to exact needs of your business."
                    onClick={onCardClick}
                  />
                </Stack>
              </Stack>
            )}

            {replyShown && (
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap={2}
                sx={{ width: '100%', height: '100%' }}
              >
                <Image
                  src={aiStub}
                  alt=""
                  onClick={() => setReplyShown(false)}
                />
              </Stack>
            )}
          </Box>
          <Stack alignItems="center" justifyContent="center">
            <SearchBar />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

const AiCard = ({
  Icon,
  title,
  body,
  onClick,
}: {
  Icon: typeof Icon1;
  title: string;
  body: string;
  onClick: () => void;
}) => {
  return (
    <Card onClick={onClick}>
      <CardContent sx={{ p: 2 }}>
        <Stack direction="column" alignItems="flex-start" gap={2}>
          <Icon sx={{ width: '40px', height: '40px' }} />
          <Typography variant="body1">{title}</Typography>
          <Typography variant="body2" color="rgba(0, 0, 0, 0.5)" fontSize={14}>
            {body}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Search term:', searchTerm);
    // Add your search handling logic here
  };

  return (
    <TextField
      className="Monite-AiSearchField"
      variant="outlined"
      placeholder="What we can help you with?"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
      sx={{ maxWidth: '720px', background: '#ffffff', borderRadius: '4px' }}
      disabled
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="outlined"
              size="small"
              className="Monite-withShadow"
              onClick={handleSearch}
              disabled
              style={{ textTransform: 'none' }} // Ensures "Send" text is not all caps
            >
              Send
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

const AlertIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <g opacity="0.4">
      <rect width="40" height="40" rx="10" fill="#9999FF" />
    </g>
    <g transform="translate(9.5, 9.5)">
      <path
        d="M18.7522 14.6735H2.4257C2.2092 14.6735 2.00156 14.7595 1.84847 14.9126C1.69538 15.0657 1.60938 15.2734 1.60938 15.4899C1.60938 15.7064 1.69538 15.914 1.84847 16.0671C2.00156 16.2202 2.2092 16.3062 2.4257 16.3062H18.7522C18.9687 16.3062 19.1764 16.2202 19.3295 16.0671C19.4826 15.914 19.5686 15.7064 19.5686 15.4899C19.5686 15.2734 19.4826 15.0657 19.3295 14.9126C19.1764 14.7595 18.9687 14.6735 18.7522 14.6735ZM18.7522 17.9388H2.4257C2.2092 17.9388 2.00156 18.0248 1.84847 18.1779C1.69538 18.331 1.60938 18.5387 1.60938 18.7552C1.60938 18.9717 1.69538 19.1793 1.84847 19.3324C2.00156 19.4855 2.2092 19.5715 2.4257 19.5715H18.7522C18.9687 19.5715 19.1764 19.4855 19.3295 19.3324C19.4826 19.1793 19.5686 18.9717 19.5686 18.7552C19.5686 18.5387 19.4826 18.331 19.3295 18.1779C19.1764 18.0248 18.9687 17.9388 18.7522 17.9388ZM5.69101 6.51026C5.52955 6.51026 5.37173 6.55814 5.23748 6.64784C5.10324 6.73754 4.99861 6.86503 4.93682 7.0142C4.87503 7.16336 4.85887 7.3275 4.89037 7.48585C4.92186 7.6442 4.99961 7.78966 5.11378 7.90382C5.22794 8.01799 5.3734 8.09573 5.53175 8.12723C5.6901 8.15873 5.85424 8.14256 6.0034 8.08078C6.15257 8.01899 6.28006 7.91436 6.36976 7.78012C6.45946 7.64587 6.50733 7.48804 6.50733 7.32659C6.50733 7.11009 6.42133 6.90245 6.26824 6.74936C6.11515 6.59627 5.90751 6.51026 5.69101 6.51026ZM17.1196 1.6123H4.05835C3.40884 1.6123 2.78594 1.87032 2.32666 2.32959C1.86739 2.78887 1.60938 3.41177 1.60938 4.06128V10.5919C1.60938 11.2414 1.86739 11.8643 2.32666 12.3236C2.78594 12.7829 3.40884 13.0409 4.05835 13.0409H17.1196C17.7691 13.0409 18.392 12.7829 18.8513 12.3236C19.3105 11.8643 19.5686 11.2414 19.5686 10.5919V4.06128C19.5686 3.41177 19.3105 2.78887 18.8513 2.32959C18.392 1.87032 17.7691 1.6123 17.1196 1.6123ZM17.9359 10.5919C17.9359 10.8084 17.8499 11.016 17.6968 11.1691C17.5437 11.3222 17.3361 11.4082 17.1196 11.4082H4.05835C3.84185 11.4082 3.63422 11.3222 3.48112 11.1691C3.32803 11.016 3.24203 10.8084 3.24203 10.5919V4.06128C3.24203 3.84478 3.32803 3.63715 3.48112 3.48405C3.63422 3.33096 3.84185 3.24496 4.05835 3.24496H17.1196C17.3361 3.24496 17.5437 3.33096 17.6968 3.48405C17.8499 3.63715 17.9359 3.84478 17.9359 4.06128V10.5919ZM10.589 4.87761C10.1046 4.87761 9.63112 5.02124 9.22839 5.29034C8.82565 5.55944 8.51176 5.94191 8.3264 6.38941C8.14105 6.8369 8.09255 7.32931 8.18704 7.80436C8.28154 8.27942 8.51478 8.71579 8.85728 9.05828C9.19977 9.40078 9.63614 9.63402 10.1112 9.72851C10.5863 9.82301 11.0787 9.77451 11.5262 9.58915C11.9736 9.4038 12.3561 9.0899 12.6252 8.68717C12.8943 8.28444 13.0379 7.81095 13.0379 7.32659C13.0379 6.67708 12.7799 6.05417 12.3207 5.5949C11.8614 5.13563 11.2385 4.87761 10.589 4.87761ZM10.589 8.14292C10.4275 8.14292 10.2697 8.09504 10.1354 8.00534C10.0012 7.91564 9.89657 7.78815 9.83478 7.63899C9.77299 7.48982 9.75683 7.32569 9.78833 7.16733C9.81982 7.00898 9.89757 6.86353 10.0117 6.74936C10.1259 6.6352 10.2714 6.55745 10.4297 6.52595C10.5881 6.49445 10.7522 6.51062 10.9014 6.5724C11.0505 6.63419 11.178 6.73882 11.2677 6.87306C11.3574 7.00731 11.4053 7.16514 11.4053 7.32659C11.4053 7.54309 11.3193 7.75073 11.1662 7.90382C11.0131 8.05691 10.8055 8.14292 10.589 8.14292ZM15.4869 6.51026C15.3255 6.51026 15.1676 6.55814 15.0334 6.64784C14.8992 6.73754 14.7945 6.86503 14.7327 7.0142C14.671 7.16336 14.6548 7.3275 14.6863 7.48585C14.7178 7.6442 14.7955 7.78966 14.9097 7.90382C15.0239 8.01799 15.1693 8.09573 15.3277 8.12723C15.486 8.15873 15.6502 8.14256 15.7993 8.08078C15.9485 8.01899 16.076 7.91436 16.1657 7.78012C16.2554 7.64587 16.3033 7.48804 16.3033 7.32659C16.3033 7.11009 16.2172 6.90245 16.0642 6.74936C15.9111 6.59627 15.7034 6.51026 15.4869 6.51026Z"
        fill="white"
      />
    </g>
  </svg>,
  'AlertIcon'
);

const Icon1 = createSvgIcon(
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="20" fill="#EBEBFF" />
    <path
      d="M29.7075 28.2899L25.9975 24.6099C27.4376 22.8143 28.135 20.5352 27.9463 18.2412C27.7576 15.9472 26.6971 13.8127 24.983 12.2765C23.2688 10.7404 21.0313 9.91941 18.7304 9.98237C16.4295 10.0453 14.2402 10.9875 12.6126 12.615C10.985 14.2426 10.0429 16.4319 9.97993 18.7328C9.91697 21.0337 10.738 23.2713 12.2741 24.9854C13.8102 26.6996 15.9448 27.76 18.2388 27.9487C20.5328 28.1374 22.8119 27.44 24.6075 25.9999L28.2875 29.6799C28.3804 29.7736 28.491 29.848 28.6129 29.8988C28.7347 29.9496 28.8655 29.9757 28.9975 29.9757C29.1295 29.9757 29.2602 29.9496 29.382 29.8988C29.5039 29.848 29.6145 29.7736 29.7075 29.6799C29.8877 29.4934 29.9885 29.2442 29.9885 28.9849C29.9885 28.7256 29.8877 28.4764 29.7075 28.2899ZM18.9975 25.9999C17.613 25.9999 16.2596 25.5894 15.1085 24.8202C13.9573 24.051 13.0601 22.9578 12.5303 21.6787C12.0005 20.3996 11.8619 18.9921 12.132 17.6343C12.4021 16.2764 13.0687 15.0291 14.0477 14.0502C15.0267 13.0712 16.274 12.4045 17.6318 12.1344C18.9897 11.8643 20.3972 12.0029 21.6762 12.5327C22.9553 13.0626 24.0486 13.9598 24.8178 15.1109C25.5869 16.2621 25.9975 17.6154 25.9975 18.9999C25.9975 20.8564 25.26 22.6369 23.9472 23.9497C22.6345 25.2624 20.854 25.9999 18.9975 25.9999Z"
      fill="#3737FF"
    />
  </svg>,
  'Icon1'
);
const Icon2 = createSvgIcon(
  <svg
    width="41"
    height="40"
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.664062" width="40" height="40" rx="20" fill="#EBEBFF" />
    <path
      d="M28.5573 17.5498C28.4742 17.3849 28.3471 17.2462 28.19 17.1491C28.0329 17.052 27.852 17.0004 27.6673 16.9998H22.6673V10.9998C22.6781 10.7805 22.6163 10.5637 22.4916 10.383C22.3669 10.2023 22.1862 10.0676 21.9773 9.9998C21.7766 9.93374 21.56 9.933 21.3588 9.99768C21.1576 10.0624 20.982 10.1891 20.8573 10.3598L12.8573 21.3598C12.7571 21.5047 12.6969 21.6734 12.6829 21.849C12.6688 22.0246 12.7014 22.2008 12.7773 22.3598C12.8473 22.5415 12.9687 22.6989 13.1268 22.8126C13.2849 22.9263 13.4728 22.9914 13.6673 22.9998H18.6673V28.9998C18.6675 29.2107 18.7343 29.4161 18.8582 29.5867C18.9822 29.7574 19.1569 29.8844 19.3573 29.9498C19.4578 29.9809 19.5622 29.9978 19.6673 29.9998C19.8251 30.0002 19.9808 29.9633 20.1216 29.892C20.2623 29.8208 20.3842 29.7172 20.4773 29.5898L28.4773 18.5898C28.5851 18.4406 28.6496 18.2646 28.6637 18.0811C28.6778 17.8976 28.641 17.7137 28.5573 17.5498ZM20.6673 25.9198V21.9998C20.6673 21.7346 20.562 21.4802 20.3744 21.2927C20.1869 21.1052 19.9326 20.9998 19.6673 20.9998H15.6673L20.6673 14.0798V17.9998C20.6673 18.265 20.7727 18.5194 20.9602 18.7069C21.1478 18.8944 21.4021 18.9998 21.6673 18.9998H25.6673L20.6673 25.9198Z"
      fill="#3737FF"
    />
  </svg>,
  'Icon2'
);

const Icon3 = createSvgIcon(
  <svg
    width="41"
    height="40"
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.335938" width="40" height="40" rx="20" fill="#EBEBFF" />
    <path
      d="M18.5059 18.55C18.5866 18.6744 18.694 18.7794 18.8203 18.8572C18.9465 18.9351 19.0885 18.9838 19.2359 19C19.384 19.015 19.5336 18.9967 19.6737 18.9466C19.8139 18.8964 19.941 18.8156 20.0459 18.71L21.1759 17.57L22.5059 19.57C22.5988 19.7039 22.7229 19.813 22.8676 19.888C23.0123 19.9629 23.173 20.0014 23.3359 20C23.5325 20.0022 23.7249 19.9428 23.8859 19.83C24.1052 19.6834 24.2576 19.4561 24.31 19.1976C24.3624 18.9392 24.3107 18.6705 24.1659 18.45L22.1659 15.45C22.0852 15.3255 21.9779 15.2206 21.8516 15.1428C21.7254 15.0649 21.5834 15.0162 21.4359 15C21.2879 14.985 21.1383 15.0033 20.9982 15.0534C20.858 15.1036 20.7309 15.1844 20.6259 15.29L19.4959 16.43L18.1659 14.43C18.1002 14.3074 18.0095 14.1998 17.8998 14.1143C17.7901 14.0287 17.6638 13.9669 17.5288 13.933C17.3939 13.899 17.2534 13.8935 17.1162 13.917C16.9791 13.9404 16.8483 13.9922 16.7323 14.0691C16.6163 14.146 16.5177 14.2462 16.4426 14.3633C16.3676 14.4805 16.3178 14.6121 16.2965 14.7496C16.2752 14.8871 16.2828 15.0275 16.3189 15.1619C16.3549 15.2963 16.4187 15.4216 16.5059 15.53L18.5059 18.55ZM29.3359 22H28.3359V12H29.3359C29.6012 12 29.8555 11.8946 30.043 11.7071C30.2306 11.5196 30.3359 11.2652 30.3359 11C30.3359 10.7348 30.2306 10.4804 30.043 10.2929C29.8555 10.1054 29.6012 10 29.3359 10H11.3359C11.0707 10 10.8164 10.1054 10.6288 10.2929C10.4413 10.4804 10.3359 10.7348 10.3359 11C10.3359 11.2652 10.4413 11.5196 10.6288 11.7071C10.8164 11.8946 11.0707 12 11.3359 12H12.3359V22H11.3359C11.0707 22 10.8164 22.1054 10.6288 22.2929C10.4413 22.4804 10.3359 22.7348 10.3359 23C10.3359 23.2652 10.4413 23.5196 10.6288 23.7071C10.8164 23.8946 11.0707 24 11.3359 24H19.3359V25.15L14.7859 28.15C14.5993 28.2655 14.4558 28.4393 14.3777 28.6445C14.2996 28.8496 14.2912 29.0748 14.3537 29.2852C14.4163 29.4957 14.5464 29.6797 14.7239 29.8089C14.9014 29.938 15.1165 30.0052 15.3359 30C15.5325 30.0022 15.7249 29.9428 15.8859 29.83L19.3359 27.55V29C19.3359 29.2652 19.4413 29.5196 19.6288 29.7071C19.8164 29.8946 20.0707 30 20.3359 30C20.6012 30 20.8555 29.8946 21.043 29.7071C21.2306 29.5196 21.3359 29.2652 21.3359 29V27.55L24.7859 29.83C24.947 29.9428 25.1393 30.0022 25.3359 30C25.5496 29.9984 25.7571 29.9283 25.928 29.8002C26.099 29.672 26.2244 29.4925 26.2859 29.2879C26.3474 29.0832 26.3417 28.8643 26.2698 28.6631C26.1978 28.462 26.0633 28.2892 25.8859 28.17L21.3359 25.17V24H29.3359C29.6012 24 29.8555 23.8946 30.043 23.7071C30.2306 23.5196 30.3359 23.2652 30.3359 23C30.3359 22.7348 30.2306 22.4804 30.043 22.2929C29.8555 22.1054 29.6012 22 29.3359 22ZM26.3359 22H14.3359V12H26.3359V22Z"
      fill="#3737FF"
    />
  </svg>,
  'Icon3'
);
