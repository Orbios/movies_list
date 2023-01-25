import toastr from 'toastr';

const exports = {
  message
};

toastr.options.positionClass = 'toast-bottom-left';

function message(message: string) {
  toastr.success(message);
}

export default exports;
