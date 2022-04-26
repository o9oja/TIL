branch 만들기
어떤 branch가 있는지 확인하고, 생성하고, 여러 branch를 옮겨다닐 수 있는 명령어들을 확인해보자.

branch 확인
git branch
명령어를 실행할 경우 * master와 같은 메세지를 확인할 수 있는데 * 는 현재 내가 사용하고 있는 branch의 이름을 나타내준다. 따라서 * master는 지금 master라는 branch를 사용하고 있다. 라는 뜻이다.
이 상태에서 새로운 branch를 만들어 주기 위해 다음의 명령어를 입력하면 된다.

branch 생성
git branch "생성하고자 하는 branch의 이름"
위 명령어를 실행한 후 다시 git branch명령어를 입력하면 최초 자동으로 생성 된 master와 내가 방금 생성한 이름의 branch가 있다. 아직은 master branch를 사용중이기 때문에 *가 master 앞에 붙어있다. 이제 새로 생성한 branch를 사용해보자.

branch 바꾸기
git checkout "생성한 branch 이름"
'master에서 checkout하고 새로운 branch로 이동하겠다.' 의 정도로 이해하면 될 것 같다.
위 명령어를 입력한 뒤 다시 git branch로 현재 상태를 확인해보면 *가 내가 생성한 branch로 옮겨간 것을 확인할 수 있다. 이제 master가 아닌 새로운 branch를 사용할 수 있다. 새로운 branch를 생성한 경우 기존 master에 있던 상태를 전부 그상태 그대로 복사해서 새로운 branch를 만드는 것이다.

( branch를 생성하고 바로 그 branch에 checkout하려면

git checkout -b "name"
으로 한번에 할 수 있다! )

branch 병합(merge)
작업을 분기를 해서 각자의 작업이 각각의 히스토리를 만들어가고 있었는데 어느 시점에서 이 작업들을 병합해야하는 경우가 발생할 수 있다. 이런 경우 사용되는게 branch 병합이다. 현재 exp에 있던 내용을 master에 병합해보도록 하자.

병합
master로 병합을 할 예정이기 때문에 먼저 master로 checkout을 한 뒤 merge라는 명령을 해준다.
관계에 유의하도록 하자.

A로 병합하려면 A로 checkout을 하고 병합 할 branch(B)를 merge 시켜주는거다.

git merge exp
이렇게 하면 에디터가 열리면서 Merge branch 'exp'라는 내용의 커밋이 만들어지는것이다.
로그로 확인해보면

조금 더 가시적으로 성공적으로 병합된것이 눈에 보인다.
이 작업으로 5의 내용을 가진 부모와 3의 내용을 가진 부모. 이렇게 두개의 부모를 가진 새로운 커밋이 생성 된 것이다. 같은 방법으로 exp로 checkout 한 뒤 다음의 명령어를 입력하면

git merge master
이제 master와 exp는 완전히 동일한 내용을 가진 파일이 된다. 그렇기 때문에 exp 브런치를 삭제해보자.

branch 삭제
git branch -d exp
exp자리에는 삭제하고싶은 branch의 이름을 적어주면 된다. 그렇게 하면 branch가 삭제되었다는 메세지가 출력되고, 다시 로그를 확인해보면 exp라는 branch가 사라진것을 확인할 수 있다.