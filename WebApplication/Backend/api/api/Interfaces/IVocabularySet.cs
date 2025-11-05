using api.Dtos;
using static api.Dtos.ServiceResponse;

namespace api.Interfaces
{
    public interface IVocabularySet
    {
        Task<IEnumerable<SetDto>> GetBasicSets();
        Task<SetDto> GetBasicSet(int setId);
        Task<IEnumerable<SetDto>> GetUserSets();
        Task<SetDto> GetUserSet(int setId);
        Task<GeneralResponse> UpdateSet(SetDto setDto);
        Task<GeneralResponse> AddSet(SetDto setDto);
        Task<GeneralResponse> AddRow(RowDto rowDto);
        Task<GeneralResponse> DeleteSet(int setId);
        Task<GeneralResponse> DeleteRow(int rowId, int setId);
    }
}
