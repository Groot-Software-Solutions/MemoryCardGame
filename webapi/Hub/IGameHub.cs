public interface IGameHub
{
    Task buildBoard(Game game);
    Task  CheckCard(string cardName, string userName);
    Task Flip(string cardName, string userName);
    Task flipCard(Card card);
    Task Join(string userName);
    Task  playerExists();
    Task playerJoined(Player player);
    Task resetFlip(Card lastCard, Card card);
    Task showMatch(Card card, string userName);
    Task waitingList();
    Task winner(Card card, string userName);
}