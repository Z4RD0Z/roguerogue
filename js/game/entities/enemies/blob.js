function gameLoadBlob(game,scene,C) {
    scene.sprites.blob={
        tags:["enemy","hitable","tostart","killplayer","toclear","stagesprite","bright"],
        hitboxX:2, hitboxY:2,
        hitboxWidth:12, hitboxHeight:14,
        zIndex:C.ENEMYZINDEX,
        minSpeedX:C.MINSPEEDX, maxSpeedX:C.MAXSPEEDX, minSpeedY:C.MINSPEEDY, maxSpeedY:C.MAXSPEEDY,
        animations:[
            {
                still:{
                    cells:game.cells.blobStill,
                },
                walk:{
                    loop:true,
                    cells:game.cells.blobWalking,
                    speed:0.1
                },
                dead:{
                    cells:game.cells.blobStill,
                },
                bubble:{
                    loop:true,
                    cells:game.cells.blobBubble,
                    speed:0.1
                },
                stunned:{
                    cells:game.cells.blobStunned
                },
                panic:{
                    loop:true,
                    cells:game.cells.blobPanic,
                    speed:0.2
                },
                washed:{
                    cells:game.cells.blobWashed
                }
            },{
                still:{
                    cells:game.cells.angryBlobStill,
                },
                walk:{
                    loop:true,
                    cells:game.cells.angryBlobWalking,
                    speed:0.1
                },
                dead:{
                    cells:game.cells.angryBlobStill,
                },
                bubble:{
                    loop:true,
                    cells:game.cells.angryBlobBubble,
                    speed:0.1
                },
                stunned:{
                    loop:true,
                    cells:game.cells.angryBlobStunned,
                    speed:0.2
                },
                panic:{
                    loop:true,
                    cells:game.cells.angryBlobPanic,
                    speed:0.2
                },
                washed:{
                    cells:game.cells.angryBlobWashed
                }
            }
        ],
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16,
            onBubbleRelease:{
                addNewSprite:"blob",
                setMode:1
            },
            onBubblePopped:{
                scatterAround:true
            },
            onDie:{
                spawnBonus:"tier1points",
                spawnBonusSequence:C.SPAWNBONUSSEQUENCE
            }
        },
        states:{
            default:{
                collisions:C.ENEMYCOLLISIONS,
                onBubbled:C.cageInBubble,
                onSnowed:C.cageInSnow,
                onSquished:C.squished,
                onWashed:C.washed,
                onRushed:C.rushed,
                onBulleted:C.bulleted,
                onFrozen:C.frozen,
                onUnfrozen:C.unfrozen,
                onSucked:C.sucked,
                onGunned:C.gunned,
                onEnter:(game,scene,sprite)=>{
                    C.enemyStart(game,scene,sprite);
                    C.walkingEnemyStart(game,scene,sprite);
                    sprite.fireTimer=C.BLOBFIRETIMER+C.RND.randomInteger(C.BLOBFIRETIMERRANGE);
                },
                onLogic:(game,scene,sprite)=>{
                    C.commonEnemyLogic(game,scene,sprite);
                    C.enemyWalking(game,scene,sprite,C.BLOBMOVESPEED);
                    if (sprite.fireTimer)
                        sprite.fireTimer--;
                    else {
                        sprite.fireTimer=C.BLOBFIRETIMER+C.RND.randomInteger(C.BLOBFIRETIMERRANGE);
                        game.addNewSprite(scene.sprites.firebolt,sprite.x,sprite.y+8);
                    }
                }
            },
            jumping:C.ENEMYJUMPING,
            preparing:C.ENEMYPREPARING,
            kill:C.ENEMYKILL,
            snowing:C.ENEMYSNOWING,
            stunned:C.ENEMYSTUNNED,
            rolling:C.ENEMYROLLING,
            sucking:C.ENEMYSUCKING,
            sucked:C.ENEMYSUCKED
        }
    }
}