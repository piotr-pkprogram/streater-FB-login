export const useValidators = (handleThrowError: any) => {
  const validateEmpty = (target: HTMLInputElement | HTMLTextAreaElement) => {
    const inputValue = target.value;
    // @ts-ignore
    const placeholder = target.getAttribute('placeholder').toLowerCase();
    const name = target.name;

    if (inputValue === '' || inputValue === undefined || inputValue === null) {
      target.classList.add('border-red-500', 'shadow-red-500', 'focus:shadow-red-500');
      target.classList.remove('border-black', 'focus:shadow-lightBlack');
      handleThrowError(name, `Pole ${placeholder} jest wymagane`);
    } else {
      target.classList.add('border-black', 'focus:shadow-lightBlack');
      target.classList.remove('border-red-500', 'shadow-red-500', 'focus:shadow-red-500');
      handleThrowError(name, '');
    }
  };

  const validateEmail = (target: HTMLInputElement | HTMLTextAreaElement) => {
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    const isInvalid = !Boolean(target.value.match(pattern));
    if (isInvalid && target.value !== '') {
      target.classList.add('border-red-500', 'shadow-red-500', 'focus:shadow-red-500');
      target.classList.remove('border-black', 'focus:shadow-lightBlack');
      handleThrowError(target.name, 'Wprowadź poprawny email');
    } else {
      validateEmpty(target);
    }
  };

  const validatePasswd = (target: HTMLInputElement | HTMLTextAreaElement) => {
    const pattern = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$');
    const isInvalid = !Boolean(target.value.match(pattern));

    if (target.value.length < 8) {
      target.classList.add('border-red-500', 'shadow-red-500', 'focus:shadow-red-500');
      target.classList.remove('border-black', 'focus:shadow-lightBlack');
      handleThrowError(target.name, 'Hasło musi mieć przynajmniej 8 znaków.');
    } else if (isInvalid && target.value !== '') {
      target.classList.add('border-red-500', 'shadow-red-500', 'focus:shadow-red-500');
      target.classList.remove('border-black', 'focus:shadow-lightBlack');
      handleThrowError(
        target.name,
        'Hasło musi zawierać co najmniej jedna liczbę oraz znak specjalny.'
      );
    } else {
      validateEmpty(target);
    }
  };

  return {
    validateEmpty,
    validateEmail,
    validatePasswd
  };
};
