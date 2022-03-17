<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;

class JwtCreatedSubscriber
{

    /**
     * @var RequestStack
     */
    private $requestStack;

    public function __construct(RequestStack $requestStack){

        $this->requestStack = $requestStack;
    }

    public function updateJwtData (JWTCreatedEvent $event) {
        $user = $event->getUser();
        $data = $event->getData();

        $data['firstname'] = $user->getFirstname();
        $data['lastname']  = $user->getLastname();

        $event->setData($data);
    }
}