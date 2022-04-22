/*
- public : 자식 클래스, 클래스 인스턴스에서 모두 접근 가능
- protected : 자식 클래스에서만 접근 가능
- private : 해당 클래스 내부에서만 접근 가능
*/

type shapes = "car" | "airplane" | "motorcycle";
type teams = "autobot" | "decepticon"
interface Details {
    team: teams,
    shape: shapes,
    name: string
};

class Transformer {
    constructor(
        private team: teams,
        protected shape: shapes,
        public name: string,
    ) {};

    protected teamOf() {
        return this.team;
    };
};

class Autobot extends Transformer {
    constructor(
        team: teams="autobot", 
        shape: shapes, 
        name: string
    ) {
        super(team, shape, name);
    };

    introduce = ():Details => {
        return {
            team: this.teamOf(),
            shape: this.shape,
            name: this.name
        };
    };
};

const bumblebee = new Autobot('autobot', 'car', 'Bumblebee');
bumblebee.introduce();

// Abstract Class
/*
    추상 클래스는 new 키워드로 사용 불가능
    반드시 상속해줌으로써 사용 가능
*/
abstract class Decepticon {
    private team: teams = "decepticon";
    constructor(
        protected shape: shapes,
        public name: string,
    ) {};
    teamOf():teams {
        return this.team;
    }
    abstract introduce():any; 
};

class Megatron extends Decepticon {
    constructor(shape: shapes, name:string) {
        super(shape, name);
    };
    introduce(): Details {
        return {
            team: this.teamOf(),
            shape: this.shape,
            name: this.name
        };
    };
};