<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{

    /**
     * @var Security
     */
    private $security;
    /**
     * @var AuthorizationCheckerInterface
     */
    private $authorizationChecker;

    public function __construct(Security $security, AuthorizationCheckerInterface $authorizationChecker) {

        $this->security = $security;
        $this->authorizationChecker = $authorizationChecker;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $this->addWhere ($resourceClass, $queryBuilder);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        $this->addWhere ($resourceClass, $queryBuilder);
    }

    private function addWhere (string $resourceClass, QueryBuilder $queryBuilder) {
        $user = $this->security->getUser();
        if(
            ($resourceClass === Customer::class || $resourceClass === Invoice::class) &&
            !$this->authorizationChecker->isGranted('ROLE_ADMIN') &&
            $user instanceof User
        ) {
            $routeAlias = $queryBuilder->getRootAliases()[0];
            if( $resourceClass === Customer::class) {
                $queryBuilder->andWhere("$routeAlias.user = :user");
            } else if ( $resourceClass === Invoice::class ) {
                $queryBuilder->join("$routeAlias.customer", 'c')
                    ->andWhere('c.user = :user');
            }
            $queryBuilder->setParameter("user", $user);
        }
    }
}