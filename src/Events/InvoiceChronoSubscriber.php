<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{

    /**
     * @var Security
     */
    private $security;
    /**
     * @var InvoiceRepository
     */
    private $invoiceRepository;

    public function __construct(Security $security, InvoiceRepository $invoiceRepository) {

        $this->security = $security;
        $this->invoiceRepository = $invoiceRepository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForInvoice ( ViewEvent $event ) {
        $invoice = $event->getControllerResult();
        $requestMethod = $event->getRequest()->getMethod();

        if( $invoice instanceof Invoice && $requestMethod === 'POST' ) {
            $user = $this->security->getUser();
            $lastChrono = $this->invoiceRepository->findLastChrono($user);
            $nextChrono = !empty($lastChrono) ? current($lastChrono)['i_chrono'] + 1 : 1;
            $invoice->setChrono($nextChrono);

            if(empty($invoice->getSentAt())) {
                $invoice->setSentAt(new \Datetime);
            }
        }
    }
}