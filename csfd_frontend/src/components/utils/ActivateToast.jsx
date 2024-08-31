import { toast } from 'sonner';

const success_toast = (message) => {
  toast.success(message, {
    position: 'top-center',
    duration: 3000,
    style: {
      fontFamily: 'Onesize',
      fontSize: '1rem',
      lineHeight: '1rem',
      height: '4rem',
      padding: '1rem',
    },
  });
};

const error_toast = (message) => {
  toast.error(message, {
    position: 'top-center',
    duration: 3000,
    style: {
      fontFamily: 'Onesize',
      fontSize: '1rem',
      lineHeight: '1rem',
      height: '4rem',
      padding: '1rem',
    },
  });
};

const info_toast = (message) => {
  toast.info(message, {
    position: 'top-center',
    duration: 3000,
    style: {
      fontFamily: 'Onesize',
      fontSize: '1rem',
      lineHeight: '1rem',
      height: '4rem',
      padding: '1rem',
    },
  });
};

export { success_toast, error_toast, info_toast };
