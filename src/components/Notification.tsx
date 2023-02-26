import { resolveValue, Toaster, ToastIcon } from 'react-hot-toast';
import { Transition } from '@headlessui/react';

export default function TailwindToaster() {
  return (
    <Toaster>
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className="flex transform rounded bg-white p-4 shadow-lg"
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <ToastIcon toast={t} />
          <p className="px-2">{resolveValue(t.message, t)}</p>
        </Transition>
      )}
    </Toaster>
  );
}
